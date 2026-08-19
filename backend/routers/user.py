"""
Autenticacion, manejo de usuarios, identidad y acceso
"""
import os
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

import dal.auth as auth
import models

load_dotenv()  # Cargar variables de entorno desde .env

router = APIRouter(prefix="/user", tags=["Authentication"])

@router.post("/signup", response_model=auth.Payload)
async def register(_: Request, body: models.Login):
    entry = models.Login(correo=body.correo, pwd_hash=auth.get_creds("", body.pwd_hash), es_administrador=False)
    return models.Login.create(data=entry.model_dump(exclude_unset=True))

# TODO: samesite, secure, httponly .domain.tld (api y fe)
@router.post("/login", response_model=auth.Payload)
async def login(_: Request, body: models.Login):
    payload = auth.gen_jwt(body.correo, body.pwd_hash)
    res = JSONResponse(payload.model_dump())
    
    is_production = os.getenv("ENVIRONMENT") == "production"

    res.set_cookie(
        key="jwtToken", value=payload.jwt, 
        # httponly=True, secure=True, samesite="Strict",
        httponly=True,
        # Dynamically applies True in production, False locally
        secure=is_production, 
        # Strict for production to prevent CSRF, Lax locally to allow port switching
        samesite="Strict" if is_production else "Lax",
        max_age=int(os.getenv("JWT_EXPIRATION", 60 * 60 * 12))
    ) # 127.0.0.1
    return res # Devolver token JWT

@router.post("/logout")
async def logout():
    res = JSONResponse({"message": "Logout exitoso"})
    res.delete_cookie("jwtToken")
    return res

@router.get("/me", response_model=models.Login)
async def me(req: Request):
    print("Passing")
    # 1. Grab the JWT from the HTTP-only cookie
    token = req.cookies.get("jwtToken")
    
    # 2. Verify the token using your existing auth module
    # This automatically raises an InternalException (401) if invalid, missing, or expired
    payload = auth.verify(token)
    
    # 3. Fetch the full user details using the email from the validated payload
    query = models.Login.get(where={"correo": payload.correo})
    
    if not query:
        from exceptions import InternalException
        raise InternalException(f"Usuario {payload.correo} no encontrado.", 404, "Usuario no existe", "auth.me")
        
    user = query[0]
    
    # 4. Return the user (FastAPI automatically filters it against the models.Login response_model)
    return user