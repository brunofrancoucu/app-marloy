from fastapi import Request # pip install fastapi uvicorn
from fastapi.responses import JSONResponse
from exceptions import InternalException

async def catch_all(req: Request, next):
    """
    Traduce excepciones a respuestas http
    Simplifica/Singulariza uso de catchs en el resto funciones
    """
    try:
        return await next(req)
    
    except InternalException as e:
        print(f"[{e.status_code}-{e._origin}] en middleware: {e._msg}")
        return JSONResponse(
            status_code=e.status_code,
            content=e.detail # _msg info sensible
        )
    
    except Exception as e:
        print(f"Error en middleware: {e}")
        return JSONResponse(
            status_code=500,
            content="Internal Server Error"
        )