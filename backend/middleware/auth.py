"""
Middleware - autorizacion con token y manejo de excepciones
contexto, http: refiere a solicitudes no protocolo http/https
"""
import re # Regex
from fastapi import Request # pip install fastapi uvicorn
import dal.auth as auth

# Regex (url path params ej. tecnico/{uId}) (rutas publicas)
API_PUBLIC_PATHS = [
    re.compile(r"^/docs$"),
    re.compile(r"^/user/.*$"),
    re.compile(r"^/tecnicos$"),
    re.compile(r"^/tecnico/\d+$"), # solo numeros
    re.compile(r"^/openapi\.json$")
]

async def protected_routes(req: Request, next):
    """
    Access control middleware
    Verifica acceso para toda ruta no publica
    Metodo: firma JWT en cookie o header Authorization
    """
    if not any(regex.match(req.url.path) for regex in API_PUBLIC_PATHS):
        token = req.cookies.get("jwtToken") or req.headers.get("Authorization")
        req.state.user = auth.verify(token) # Autenticar con JWT
    return await next(req)
