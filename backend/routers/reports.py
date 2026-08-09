"""
Consultas para reportes
"""
from fastapi import APIRouter
from mysqlormlite import utils

from dal.utils import file_stmts

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/clientes")
async def reporte_clientes():
    """
    Reporte 4.1: total mensual a cobrar a cada cliente
    suma alquileres de maquinas mas costo insumos consumidos
    """
    return utils.raw_sql(file_stmts("queries/clientes.sql"))

@router.get("/consumos")
async def reporte_consumos():
    """
    Reporte 4.2: consumo de insumos con precio
    """
    return utils.raw_sql(file_stmts("queries/consumos.sql"))

@router.get("/mantenimientos")
async def reporte_mantenimientos():
    """
    Reporte 4.3: tecnicos con mas mantenimientos
    """
    return utils.raw_sql(file_stmts("queries/mantenimientos.sql"))

@router.get("/maquinas")
async def reporte_maquinas():
    """
    Reporte 4.4: clientes con mas maquinas
    """
    return utils.raw_sql(file_stmts("queries/maquinas.sql"))

