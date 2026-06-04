from pydantic import BaseModel, Field


class ComposicionIn(BaseModel):
    notas: list[str] = Field(default_factory=list)
    precision_calibracion: float | None = None


class ComposicionOut(BaseModel):
    id: int
    notas: list[str]
    precision_calibracion: float | None = None
    created_at: str
