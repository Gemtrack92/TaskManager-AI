from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

from models import init_db, get_connection


app = Flask(__name__)

CORS(app)


# =====================================
# Inicialización de base de datos
# =====================================

init_db()



# =====================================
# Valores permitidos
# =====================================

ESTADOS_VALIDOS = [
    "Pendiente",
    "En progreso",
    "Completada"
]


PRIORIDADES_VALIDAS = [
    "Alta",
    "Media",
    "Baja"
]



# =====================================
# Validación de datos
# =====================================

def validar_tarea(data):

    errores = []


    titulo = data.get(
        "titulo",
        ""
    ).strip()



    estado = data.get(
        "estado",
        "Pendiente"
    )


    prioridad = data.get(
        "prioridad",
        "Media"
    )



    if not titulo:

        errores.append(
            "El título es obligatorio."
        )



    if estado not in ESTADOS_VALIDOS:

        errores.append(
            "El estado seleccionado no es válido."
        )



    if prioridad not in PRIORIDADES_VALIDAS:

        errores.append(
            "La prioridad seleccionada no es válida."
        )



    return errores





# =====================================
# Página principal
# =====================================

@app.route("/")
def home():

    return render_template(
        "index.html"
    )





# =====================================
# GET - Obtener tareas
# =====================================

@app.route(
    "/api/tasks",
    methods=["GET"]
)

def get_tasks():


    conn = get_connection()

    cursor = conn.cursor()



    cursor.execute(
        """
        SELECT *
        FROM tasks
        ORDER BY id DESC
        """
    )



    tasks = [

        dict(row)

        for row in cursor.fetchall()

    ]



    conn.close()



    return jsonify(tasks)





# =====================================
# POST - Crear tarea
# =====================================

@app.route(
    "/api/tasks",
    methods=["POST"]
)

def create_task():


    data = request.get_json()



    errores = validar_tarea(
        data
    )



    if errores:


        return jsonify({

            "success": False,

            "errors": errores

        }),400





    conn = get_connection()

    cursor = conn.cursor()



    cursor.execute(

        """
        INSERT INTO tasks
        (
            titulo,
            descripcion,
            estado,
            prioridad,
            fecha_vencimiento
        )

        VALUES (?,?,?,?,?)

        """,

        (

            data.get("titulo"),

            data.get(
                "descripcion",
                ""
            ),

            data.get(
                "estado",
                "Pendiente"
            ),

            data.get(
                "prioridad",
                "Media"
            ),

            data.get(
                "fecha_vencimiento",
                ""
            )

        )

    )



    conn.commit()

    conn.close()




    return jsonify({

        "success": True,

        "message":
        "Tarea creada correctamente."

    })






# =====================================
# PUT - Actualizar tarea
# =====================================

@app.route(
    "/api/tasks/<int:id>",
    methods=["PUT"]
)

def update_task(id):


    data = request.get_json()



    errores = validar_tarea(
        data
    )



    if errores:


        return jsonify({

            "success": False,

            "errors": errores

        }),400





    conn = get_connection()

    cursor = conn.cursor()



    cursor.execute(

        """

        UPDATE tasks

        SET

        titulo=?,

        descripcion=?,

        estado=?,

        prioridad=?,

        fecha_vencimiento=?

        WHERE id=?

        """,

        (

            data.get(
                "titulo"
            ),

            data.get(
                "descripcion",
                ""
            ),

            data.get(
                "estado"
            ),

            data.get(
                "prioridad"
            ),

            data.get(
                "fecha_vencimiento",
                ""
            ),

            id

        )

    )



    conn.commit()

    conn.close()




    return jsonify({

        "success": True,

        "message":
        "Tarea actualizada correctamente."

    })







# =====================================
# DELETE - Eliminar tarea
# =====================================

@app.route(
    "/api/tasks/<int:id>",
    methods=["DELETE"]
)

def delete_task(id):


    conn = get_connection()

    cursor = conn.cursor()



    cursor.execute(

        """

        DELETE FROM tasks

        WHERE id=?

        """,

        (id,)

    )



    conn.commit()

    conn.close()



    return jsonify({

        "success": True,

        "message":
        "Tarea eliminada correctamente."

    })







# =====================================
# Ejecutar servidor
# =====================================

if __name__ == "__main__":


    app.run(

        debug=True,

        host="0.0.0.0",

        port=5000

    )