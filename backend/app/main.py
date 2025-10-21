from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints

app = FastAPI()

# Permitir solicitudes desde el frontend
origins = [
    "https://eva2-frontend.onrender.com",
    "http://localhost:5173",  # puerto por defecto de Vite
    "http://127.0.0.1:5173"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],      # permite GET, POST, PUT, DELETE, OPTIONS...
    allow_headers=["*"],
)

app.include_router(endpoints.router)
