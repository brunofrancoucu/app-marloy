"""
SQL Table / Entry endpoints
"""
from fastapi import APIRouter
from dal import crud
from typing import List
from sql import models

from sql import models

router = APIRouter(tags=["Queries"])

@router.get("/clientes")
async def clientes():
    return crud.get_table("clientes", models.Cliente)

@router.get("/proveedores")
async def proveedores():
    return crud.get_table("proveedores", models.Proveedor)

@router.get("/tecnicos")
async def tecnicos():
    return crud.get_table("tecnicos", models.Tecnico)

@router.get("/insumos")
async def insumos():
    return crud.get_table("insumos", models.Insumo)

# Ej.: GET localhost:8000/cliente/201
@router.get("/cliente/{uId}") 
async def cliente(uId: int | str):
    return crud.get_entry("clientes", "id_cliente", uId, models.Cliente)

# Ej.: GET localhost:8000/proveedor/101
@router.get("/proveedor/{uId}") 
async def proveedor(uId: int | str):
    return crud.get_entry("proveedores", "id_proveedor", uId, models.Proveedor)

# Ej.: GET localhost:8000/tecnico/45556667
@router.get("/tecnico/{uId}") 
async def tecnico(uId: int | str):
    return crud.get_entry("tecnicos", "ci", uId, models.Tecnico)

# Ej.: GET localhost:8000/insumo/1
@router.get("/insumo/{uId}") 
async def insumo(uId: int | str):
    return crud.get_entry("insumos", "id_insumo", uId, models.Insumo)