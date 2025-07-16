"""
API server - FastAPI (Backend entry point)
Estructura de api: `./Consigna.pdf`
"""
import os
from fastapi import FastAPI, Request # type: ignore
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from exceptions import InternalException
import openapi as custom_openapi
import middleware # mdlwr

import sql.models as models # tipado del schema
import dal.auth as auth # autenticacion
import dal.crud as crud # SQL ops

app = FastAPI()
# /docs swagger ui + -H Authorization (button)
app.openapi = lambda: custom_openapi.custom(app)
app.middleware("http")(middleware.access)
app.middleware("http")(middleware.exceptions)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Autenticacion, manejo de usuarios, identidad y acceso
# app.include_router(auth.router)

# TODO: samesite, secure, httponly .domain.tld (api y fe)
@app.post("/login")
async def login(_: Request, body: models.Login):
    payload = auth.gen_jwt(body.correo, body.pwd_hash)
    res = JSONResponse(payload.model_dump())
    res.set_cookie(
        key="jwtToken", value=payload.jwt, 
        httponly=True, secure=True, samesite="Strict",
        max_age=int(os.getenv("JWT_EXPIRATION", 60 * 60 * 12))
    ) # 127.0.0.1
    return res # Devolver token JWT

@app.post("/logout")
async def logout():
    res = JSONResponse({"message": "Logout exitoso"})
    res.delete_cookie("jwtToken")
    return res

@app.post("/register")
async def register(_: Request, body: models.Login):
    entry = models.Login(correo=body.correo, pwd_hash=auth.get_creds("", body.pwd_hash))
    return crud.create("login", entry)

# 1. ABM, Alta baja y modificacion

@app.put("/proveedor") # UPDATE proveedor
async def update_proveedor(req: Request, entry: models.Proveedor):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/proveedor")
    
    # Actualizar proveedor
    return crud.update("proveedores", entry)

@app.put("/maquina") # UPDATE maquina
async def update_maquina(req: Request, entry: models.Maquina):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/maquina")
    
    # Actualizar maquina
    return crud.update("maquinas", entry)

@app.put("/tecnico") # UPDATE tecnico
async def update_tecnico(req: Request, entry: models.Tecnico):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/tecnico")
    
    # Actualizar tecnico
    return crud.update("tecnicos", entry)

@app.put("/insumo") # UPDATE insumo
async def update_insumo(_: Request, entry: models.Insumo):
    # Actualizar insumo
    return crud.update("insumos", entry)

@app.put("/cliente") # UPDATE cliente
async def update_cliente(_: Request, entry: models.Cliente):
    # Actualizar cliente
    return crud.update("clientes", entry)

@app.put("/mantenimiento") # UPDATE mantenimiento
async def update_mantenimiento(_: Request, entry: models.Mantenimiento):
    # Actualizar mantenimiento
    return crud.update("mantenimientos", entry)

# 5. Consultas para reportes

@app.get("/reporte-clientes")
async def reporte_clientes():
    """
    Reporte 5.1: total mensual a cobrar a cada cliente
    suma alquileres de maquinas mas costo insumos consumidos
    """
    return crud.sql_file("queries/clientes.sql")

@app.get("/reporte-consumos")
async def reporte_consumos():
    """
    Reporte 5.2: consumo de insumos con precio
    """
    return crud.sql_file("queries/consumos.sql")

@app.get("/reporte-mantenimientos")
async def reporte_mantenimientos():
    """
    Reporte 5.3: tecnicos con mas mantenimientos
    """
    return crud.sql_file("queries/mantenimientos.sql")

@app.get("/reporte-maquinas")
async def reporte_maquinas():
    """
    Reporte 5.4: clientes con mas maquinas
    """
    return crud.sql_file("queries/maquinas.sql")

# SQL Table endpoints

@app.get("/clientes")
async def clientes():
    return crud.get_table("clientes")

@app.get("/proveedores")
async def proveedores():
    return crud.get_table("proveedores")

@app.get("/tecnicos")
async def tecnicos():
    return crud.get_table("tecnicos")

@app.get("/insumos")
async def insumos():
    return crud.get_table("insumos")

# SQL Entry endpoints

# Ej.: GET localhost:8000/cliente/201
@app.get("/cliente/{uId}") 
async def cliente(uId: int | str):
    return crud.get_entry("clientes", "id_cliente", uId)

# Ej.: GET localhost:8000/proveedor/101
@app.get("/proveedor/{uId}") 
async def proveedor(uId: int | str):
    return crud.get_entry("proveedores", "id_proveedor", uId)

# Ej.: GET localhost:8000/tecnico/45556667
@app.get("/tecnico/{uId}") 
async def tecnico(uId: int | str):
    return crud.get_entry("tecnicos", "ci", uId)

# Ej.: GET localhost:8000/insumo/1
@app.get("/insumo/{uId}") 
async def insumo(uId: int | str):
    return crud.get_entry("insumos", "id_insumo", uId)