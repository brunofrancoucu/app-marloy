"""
API server - FastAPI (Backend entry point)
Estructura de api: `./Consigna.pdf`
"""
from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware
import openapi as custom_openapi

import middleware # mdlwr
from routers import user, reports, queries, abm

app = FastAPI()

# /docs swagger ui + -H Authorization (button)
app.openapi = lambda: custom_openapi.custom(app)
app.middleware("http")(middleware.access)
app.middleware("http")(middleware.exceptions)

# CORS - Cross-Origin Resource Sharing
origins = ["http://localhost:3000", "http://127.0.0.1:3000",]
app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

# 1 Autenticacion identidad usuario
app.include_router(user.router)

# 2 ABM, Alta baja y modificacion
app.include_router(abm.router)

# 3 SQL Table / Entry endpoints
app.include_router(queries.router)

# 4 Reportes - Queries SQL
app.include_router(reports.router)