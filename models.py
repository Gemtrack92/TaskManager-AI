import sqlite3

DATABASE = "database.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            estado TEXT NOT NULL DEFAULT 'Pendiente',
            prioridad TEXT NOT NULL DEFAULT 'Media',
            fecha_vencimiento TEXT
        )
    """)

    conn.commit()
    conn.close()