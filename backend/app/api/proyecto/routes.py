from fastapi import APIRouter
from app.api.proyecto.crud import create_composition as create_composition_db, get_compositions, get_last_composition
from app.api.proyecto.schemas import ComposicionIn, ComposicionOut

router = APIRouter()

@router.get("/compositions")
def compositions():
    return {"data": get_compositions()}


@router.get("/last_composition")
def last_composition():
    return {"data": get_last_composition()}


@router.post("/compositions", response_model=ComposicionOut)
def create_composition(payload: ComposicionIn):
    return create_composition_db(payload.notas, payload.precision_calibracion)