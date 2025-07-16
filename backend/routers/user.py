"""
Autenticacion, manejo de usuarios, identidad y acceso
"""
import os
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from sql import models
from dal import auth, crud

router = APIRouter(prefix="/user", tags=["Authentication"])

# TODO: samesite, secure, httponly .domain.tld (api y fe)
@router.post("/login")
async def login(_: Request, body: models.Login):
    payload = auth.gen_jwt(body.correo, body.pwd_hash)
    res = JSONResponse(payload.model_dump())
    res.set_cookie(
        key="jwtToken", value=payload.jwt, 
        httponly=True, secure=True, samesite="Strict",
        max_age=int(os.getenv("JWT_EXPIRATION", 60 * 60 * 12))
    ) # 127.0.0.1
    return res # Devolver token JWT

@router.post("/logout")
async def logout():
    res = JSONResponse({"message": "Logout exitoso"})
    res.delete_cookie("jwtToken")
    return res

@router.post("/register")
async def register(_: Request, body: models.Login):
    entry = models.Login(correo=body.correo, pwd_hash=auth.get_creds("", body.pwd_hash))
    return crud.create("login", entry)
