"""
ABM, Alta baja y modificacion
"""
from fastapi import APIRouter, Request

from exceptions import InternalException
import models

router = APIRouter(tags=["ABM"])

@router.put("/proveedor") # UPDATE proveedor
async def update_proveedor(req: Request, entry: models.Proveedores):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/proveedor")
    
    # Actualizar proveedor
    return models.Proveedores.update_many(where={"id_proveedor": entry.id_proveedor}, data=entry.model_dump(exclude_unset=True))

@router.put("/maquina") # UPDATE maquina
async def update_maquina(req: Request, entry: models.Maquinas):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/maquina")
    
    # Actualizar maquina
    return models.Maquinas.update_many(where={"id_maquina": entry.id_maquina}, data=entry.model_dump(exclude_unset=True))

@router.put("/tecnico") # UPDATE tecnico
async def update_tecnico(req: Request, entry: models.Tecnicos):
    # Solo usuarios administradores
    if not req.state.user.es_administrador:
        raise InternalException("Operacion requiere rol de administrador.", 401, f"No admin en {req.path}, {entry}", "PUT:/tecnico")
    
    # Actualizar tecnico
    return models.Tecnicos.update_many(where={"ci": entry.ci}, data=entry.model_dump(exclude_unset=True))

@router.put("/insumo") # UPDATE insumo
async def update_insumo(_: Request, entry: models.Insumos):
    # Actualizar insumo
    return models.Insumos.update_many(where={"id_insumo": entry.id_insumo}, data=entry.model_dump(exclude_unset=True))

@router.put("/cliente") # UPDATE cliente
async def update_cliente(_: Request, entry: models.Clientes):
    # Actualizar cliente
    return models.Clientes.update_many(where={"id_cliente"}, data=entry.model_dump(exclude_unset=True))

@router.put("/mantenimiento") # UPDATE mantenimiento
async def update_mantenimiento(_: Request, entry: models.Mantenimientos):
    # Actualizar mantenimiento
    return models.Mantenimientos.update_many(where={"id_mantenimiento": entry.id_mantenimiento}, data=entry.model_dump(exclude_unset=True))
