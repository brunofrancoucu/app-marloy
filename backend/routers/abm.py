"""
ABM, Alta baja y modificacion
"""
from fastapi import APIRouter, Request
from dal import crud

from exceptions import InternalException
import sql.models as models # tipado del schema
import dal.crud as crud # SQL ops

router = APIRouter(tags=["ABM"])

@router.put("/proveedor") # UPDATE proveedor
async def update_proveedor(req: Request, entry: models.Proveedor):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/proveedor")
    
    # Actualizar proveedor
    return crud.update("proveedores", entry, models.Proveedor)

@router.put("/maquina") # UPDATE maquina
async def update_maquina(req: Request, entry: models.Maquina):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/maquina")
    
    # Actualizar maquina
    return crud.update("maquinas", entry, models.Maquina)

@router.put("/tecnico") # UPDATE tecnico
async def update_tecnico(req: Request, entry: models.Tecnico):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/tecnico")
    
    # Actualizar tecnico
    return crud.update("tecnicos", entry, models.Tecnico)

@router.put("/insumo") # UPDATE insumo
async def update_insumo(_: Request, entry: models.Insumo):
    # Actualizar insumo
    return crud.update("insumos", entry, models.Insumo)

@router.put("/cliente") # UPDATE cliente
async def update_cliente(_: Request, entry: models.Cliente):
    # Actualizar cliente
    return crud.update("clientes", entry, models.Cliente)

@router.put("/mantenimiento") # UPDATE mantenimiento
async def update_mantenimiento(_: Request, entry: models.Mantenimiento):
    # Actualizar mantenimiento
    return crud.update("mantenimientos", entry, models.Mantenimiento)
