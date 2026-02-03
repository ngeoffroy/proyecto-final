from fastapi import FastAPI
from app.api.proyecto.routes import router as api_router

app = FastAPI(title="Proyecto")

app.include_router(api_router, prefix="/api/proyecto")

@app.get("/health")
def health():
    return {"status": "ok"}