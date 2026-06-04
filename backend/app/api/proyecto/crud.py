from __future__ import annotations

import json

from app.core.db import get_connection


def get_compositions() -> list[dict]:
    conn = get_connection()
    qry = "SELECT id, notas, precision_calibracion, created_at FROM composiciones ORDER BY id DESC"
    try:
        rows = conn.execute(qry).fetchall()
        return [
            {
                "id": row["id"],
                "notas": json.loads(row["notas"]),
                "precision_calibracion": row["precision_calibracion"],
                "created_at": row["created_at"],
            }
            for row in rows
        ]
    finally:
        conn.close()

def get_last_composition() -> list:
    conn = get_connection()
    try:
        qry = "SELECT * from composiciones ORDER BY id DESC limit 1"
        row = conn.execute(qry).fetchone()
        return [
            {
                "id": row["id"],
                "notas": json.loads(row["notas"]),
                "precision_calibracion": row["precision_calibracion"],
                "created_at": row["created_at"],
            }
        ]
    finally:
        conn.close

def create_composition(notas: list[str], precision_calibracion: float | None) -> dict:
    conn = get_connection()
    qry = '''
    INSERT INTO composiciones (notas, precision_calibracion) VALUES (?, ?)
    '''
    try:
        cursor = conn.execute(qry, (json.dumps(notas), precision_calibracion))
        conn.commit()

        qry_result = "SELECT id, notas, precision_calibracion, created_at FROM composiciones WHERE id = ?"
        row = conn.execute(qry_result,(cursor.lastrowid,)).fetchone()

        return {
            "id": row["id"],
            "notas": json.loads(row["notas"]),
            "precision_calibracion": row["precision_calibracion"],
            "created_at": row["created_at"],
        }
    finally:
        conn.close()
