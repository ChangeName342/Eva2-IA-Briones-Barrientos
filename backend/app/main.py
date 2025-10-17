from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints

app = FastAPI()

# Permitir solicitudes desde el frontend
origins = [
    "http://localhost:5173",  # o el puerto donde corre tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],      # permite GET, POST, PUT, DELETE, OPTIONS...
    allow_headers=["*"],
)

app.include_router(endpoints.router)
