from __future__ import annotations

import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DB_PATH = BASE_DIR / "proyecto.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    try:
        qry ="""
            CREATE TABLE IF NOT EXISTS composiciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                notas TEXT NOT NULL,
                precision_calibracion REAL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        conn.execute(qry)
        conn.commit()
    finally:
        conn.close()
