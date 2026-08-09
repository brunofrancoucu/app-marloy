"""
SQL Table / Entry endpoints
"""
from fastapi import APIRouter
import models

router = APIRouter(tags=["Queries"])

@router.get("/clientes")
async def clientes():
    return models.Clientes.get_all()

@router.get("/proveedores")
async def proveedores():
    return models.Proveedores.get_all()

@router.get("/tecnicos")
async def tecnicos():
    return models.Tecnicos.get_all()

@router.get("/insumos")
async def insumos():
    return models.Insumos.get_all()

# Ej.: GET localhost:8000/cliente/201
@router.get("/cliente/{uId}") 
async def cliente(uId: int | str):
    return models.Clientes.get(where={"id_cliente": {"equals": uId}})[0]

# Ej.: GET localhost:8000/proveedor/101
@router.get("/proveedor/{uId}") 
async def proveedor(uId: int | str):
    return models.Proveedores.get(where={"id_proveedor": {"equals": uId}})

# Ej.: GET localhost:8000/tecnico/45556667
@router.get("/tecnico/{uId}") 
async def tecnico(uId: int | str):
    return models.Tecnicos.get(where={"ci": {"equals": uId}})[0]

# Ej.: GET localhost:8000/insumo/1
@router.get("/insumo/{uId}") 
async def insumo(uId: int | str):
    return models.Insumos.get(where={"id_insumo": {"equals": uId}})
