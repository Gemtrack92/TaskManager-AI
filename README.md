# 📋 TaskManager AI

Aplicación web para la gestión de tareas desarrollada con **Python Flask**, utilizando una base de datos local SQLite y una interfaz moderna basada en Bootstrap.

El proyecto fue desarrollado mediante interacción con un asistente de Inteligencia Artificial, siguiendo un proceso iterativo de generación, validación y mejora del código.

---

# 📌 Descripción del proyecto

TaskManager AI permite administrar tareas mediante una aplicación web completa con operaciones CRUD:

- Crear tareas.
- Consultar tareas.
- Actualizar tareas.
- Eliminar tareas.

Además incorpora un dashboard con indicadores de productividad, gráficos estadísticos y filtros avanzados.

---

# 🎯 Objetivo

Desarrollar una aplicación web funcional que permita demostrar el proceso de creación de software utilizando asistentes de programación basados en Inteligencia Artificial.

---

# 🏗️ Arquitectura del sistema

Usuario
|
|
Frontend
HTML + CSS + JavaScript + Bootstrap
|
|
API REST Flask
|
|
SQLite
Base de datos local



---

# 🛠️ Tecnologías utilizadas


| Tecnología | Uso |
|---|---|
| Python | Lenguaje principal |
| Flask | Framework backend |
| SQLite | Base de datos |
| HTML5 | Estructura web |
| CSS3 | Diseño visual |
| JavaScript | Interactividad |
| Bootstrap 5 | Componentes UI |
| Chart.js | Gráficos estadísticos |


---

# ✨ Funcionalidades principales


## Gestión de tareas

✅ Crear tareas.

✅ Editar tareas.

✅ Eliminar tareas.

✅ Consultar tareas almacenadas.



## Validaciones

La aplicación valida:

- Título obligatorio.
- Estados permitidos.
- Prioridades permitidas.



## Dashboard

Incluye:

- Total de tareas.
- Tareas pendientes.
- Tareas en progreso.
- Tareas completadas.
- Tareas vencidas.
- Porcentaje de avance.


## Visualización gráfica

Incluye:

- Gráfico circular por estado.
- Gráfico de barras por prioridad.



## Búsqueda y filtros

Permite filtrar por:

- Texto.
- Estado.
- Prioridad.


---

# 📂 Estructura del proyecto

task-manager-ai/

│
├── app.py
│
├── models.py
│
├── database.db
│
├── requirements.txt
│
├── README.md
│
│
├── templates/
│ |
│ └── index.html
│
│
└── static/
|
├── style.css
|
└── script.js



---

# ⚙️ Instalación


## 1. Clonar repositorio


```bash
git clone https://github.com/usuario/task-manager-ai.git

cd task-manager-ai

2. Crear entorno virtual

Windows:

python -m venv venv

Activar:

venv\Scripts\activate

Linux / Mac:

source venv/bin/activate
3. Instalar dependencias
pip install -r requirements.txt
▶️ Ejecución

Ejecutar:

python app.py

La aplicación estará disponible en:

http://127.0.0.1:5000
🗄️ Modelo de datos

Tabla:

tasks

Campos:

Campo	Tipo
id	Integer
titulo	Text
descripcion	Text
estado	Text
prioridad	Text
fecha_vencimiento	Date
🤖 Desarrollo utilizando Inteligencia Artificial

El desarrollo fue realizado mediante interacción con un asistente de IA.

Proceso utilizado:

Definición del requerimiento.
Generación inicial del código.
Pruebas funcionales.
Identificación de errores.
Solicitud de mejoras.
Integración de nuevas funcionalidades.

👨‍💻 Autor

Proyecto académico desarrollado mediante programación asistida por Inteligencia Artificial.

📄 Licencia

Proyecto desarrollado con fines educativos.


---

# Resultado de este paso

Ahora el proyecto tiene:

```text
task-manager-ai/

✅ Código funcional
✅ Base de datos
✅ Frontend
✅ Backend
✅ Dashboard
✅ README profesional