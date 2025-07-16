"""
Operaciones CRUD (funciones utilitarias)
"""
from typing import Type, List, TypeVar
import dal.utils as utils
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

# Create

def create(table: str, full_entry, model: Type[T]) -> T:
    """
    Crear una nuevo registro en tabla
    devuelve el registro creado
    """
    uIdVal = list(full_entry.dict().values())[0]
    uIdCol = list(full_entry.dict().keys())[0]

    def op(cursor):
        cols = utils.to_tb_cols(type(full_entry))
        # parameterized query / prepared statement
        placeholder = ", ".join(["%s"]*len(full_entry.dict()))
        sql = f"INSERT INTO {utils.san(table)} ({cols}) VALUES ({placeholder})"
        cursor.execute(sql, list(full_entry.dict().values()))
    
    utils.db_cursor(op, "WRITE")
    
    # Return affected / modified record row
    return get_entry(table, uIdCol, uIdVal, model)

# Read

def get_table(table: str, model: Type[T]) -> List[T]:
    """
    Funcion utilitaria, get completo para una tabla (SELECT *)
    Simplifica: endpoints simples, ej. https://localhost:8000/clientes
    """
    # cols = list(model.model_fields.keys()) # Type
    
    def op(cursor):
        sql = f"SELECT * FROM gestion_comercial.{utils.san(table)}"
        cursor.execute(sql)
        
        return [model(**row) for row in cursor.fetchall()]

    return utils.db_cursor(op)

def get_entry(table: str, col: str, uId, model: Type[T]) -> T:
    """
    Funcion utilitaria, data point especifico (row / record / entry)
    Dado una tabla, propiedad, y valor
    Simplifica: endpoints individuales simples, ej. https://localhost:8000/cliente/123456
    """
    # cols = list(model.model_fields.keys()) # Type
    
    def op(cursor):
        sql = f"SELECT * FROM gestion_comercial.{utils.san(table)} WHERE {utils.san(col)} = %s"
        cursor.execute(sql, (uId,))
        rows = cursor.fetchall()

        return model(**rows[0]) if rows else None
        # alt: get entries[] on !PK

    return utils.db_cursor(op)

# Update

def update(table: str, full_entry, model: Type[T]) -> T:
    """
    Para un uId actualizar propiedades
    Devuelve el registro actualizado
    full_entry: contiene None para valores a omitir UPDATE
    """
    uIdVal = list(full_entry.dict().values())[0]
    uIdCol = list(full_entry.dict().keys())[0]    
    clause = utils.to_clause(full_entry.dict(exclude_none = True))

    def op(cursor): 
        stmt = f"UPDATE {utils.san(table)} SET {clause} WHERE {utils.san(uIdCol)} = %s"
        cursor.execute(stmt, (uIdVal,))
    
    utils.db_cursor(op, "WRITE")
    
    # Return affected / modified record row
    return get_entry(table, uIdCol, uIdVal, model)

# Delete

# Files

def sql_file(path: str):
    """
    Para .sql con statements (stmts), ejecutar
    devuelve resultados del cursor
    """
    def query(cursor):
        results = []
        for stmt in utils.file_stmts(path):
            cursor.execute(stmt)
            for row in cursor:
                results.append(row)
        return results

    return utils.db_cursor(query)