"""
Utilidades para la aplicacion de gestion comercial backend
"""
import mysql.connector #pip install mysql-connector-python
import os

# DB_USERS = {
#     "READ": {"user": "reader", "password": "reader_pass", },
#     "WRITE": {"user": "writer", "password": "writer_pass", },
#     "ROOT": {"user": "root", "password": "root", },
# }

def db_cursor(crud_op, op = "READ"):
    """
    Funcion utilitaria para ejecutar operaciones CRUD
    Simplifica: necesidad de declarar conexion, cursor y close
    """
    conexion = mysql.connector.connect(
        host=os.getenv("DB_HOST", "database"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME"),
        auth_plugin='mysql_native_password',
    )
    cursor = conexion.cursor(dictionary=True)
    try:
        result = crud_op(cursor)
        cursor.close()
        return result
    finally:
        conexion.commit()
        conexion.close()

def san(statement: str | bool | int | None):
    """
    Sanitize Statement - Validar statements SQL (Parameterized) (Custom query builder)
    Simplifica: checkeo de comillas.., caracteres sql injection / argumentos
    nota: remueve tildes, enie.. (cuando %s no posible)
    """
    validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_ "
    sanitized = ''

    if isinstance(statement, (bool, int)) or statement is None:
        return f"{statement}"

    for char in statement.replace("\n", "").replace("\t", ""):
        if char in validChars:
            sanitized += char
    return sanitized

def to_clause(data):
    """
    python Dict to  sql SET clause
    """
    return ", ".join(f"{san(key)} = {f"'{san(value)}'" if type(value) == str else san(value)}" for key, value in data.items())

def to_tb_cols(model):
    """
    Columns name list (INSERT INTO (__)) (sanitized)
    nombre de columnas a partir de los atributos de un modelo
    """
    atts = list(model.model_fields.keys())
    return ", ".join(f"{san(att)}" for att in atts)

"""
Devolver lista de statments para archivo sql
"""
def file_stmts(path: str):
    stmts = []
    with open(path, "r", encoding="utf-8") as f:
        sql_commands = f.read()
    for statement in sql_commands.split(";"):
        stmt = statement.strip()
        # if stmt and not stmt.startswith('--') and not stmt.startswith('/*'):
        stmts.append(stmt)
    return stmts