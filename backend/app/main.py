from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.proyecto.routes import router as api_router
from app.core.db import init_db

app = FastAPI(title="Proyecto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/proyecto")


@app.on_event("startup")
def startup_event() -> None:
    init_db()

@app.get("/health")
def health():
    return {"status": "ok"}