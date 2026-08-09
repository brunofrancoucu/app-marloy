"""
Utilidades para la aplicacion de gestion comercial backend
"""

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