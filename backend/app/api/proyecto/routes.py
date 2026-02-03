from fastapi import APIRouter

router = APIRouter()

@router.get("/composiciones")
def composiciones():
    return {"data": []}