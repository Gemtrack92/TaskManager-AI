const API_URL = "/api/tasks";

let tasks = [];

let statusChart = null;
let priorityChart = null;


// ==========================================
// INICIO DE APLICACIÓN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTasks();


        document
        .getElementById("taskForm")
        .addEventListener(
            "submit",
            saveTask
        );


        document
        .getElementById("search")
        .addEventListener(
            "input",
            applyFilters
        );


        document
        .getElementById("filterStatus")
        .addEventListener(
            "change",
            applyFilters
        );


        document
        .getElementById("filterPriority")
        .addEventListener(
            "change",
            applyFilters
        );

    }
);



// ==========================================
// ALERTAS BOOTSTRAP
// ==========================================

function showAlert(message, type="success"){


    const container =
    document.getElementById(
        "alertContainer"
    );


    container.innerHTML = `

        <div class="alert alert-${type}
        alert-dismissible fade show"
        role="alert">

            ${message}

            <button 
            type="button"
            class="btn-close"
            data-bs-dismiss="alert">
            </button>

        </div>

    `;


    setTimeout(
        () => {

            container.innerHTML="";

        },
        4000
    );

}




// ==========================================
// CONSULTAR TAREAS
// ==========================================

async function loadTasks(){


    try{


        const response =
        await fetch(API_URL);


        tasks =
        await response.json();



        renderTasks(tasks);


        updateDashboard(tasks);



    }
    catch(error){


        showAlert(
            "Error al cargar tareas.",
            "danger"
        );

    }

}






// ==========================================
// MOSTRAR TABLA
// ==========================================

function renderTasks(data){


    const table =
    document.getElementById(
        "taskTable"
    );


    table.innerHTML="";



    data.forEach(task => {


        let overdue =
        isOverdue(
            task.fecha_vencimiento
        );



        let row =
        document.createElement(
            "tr"
        );



        if(overdue){

            row.classList.add(
                "table-danger"
            );

        }



        row.innerHTML = `


        <td>
            ${task.id}
        </td>


        <td>

            <strong>
            ${task.titulo}
            </strong>

            <br>

            <small>
            ${task.descripcion || ""}
            </small>

        </td>



        <td>

            <span class="badge 
            bg-secondary">

            ${task.prioridad}

            </span>

        </td>




        <td>

            <span class="badge 
            bg-info text-dark">

            ${task.estado}

            </span>

        </td>




        <td>

            ${task.fecha_vencimiento || "-"}

            ${
            overdue
            ?
            "<br><small>⚠ Vencida</small>"
            :
            ""
            }

        </td>





        <td>


        <button

        class="btn btn-warning btn-sm"

        onclick="editTask(${task.id})">

        ✏ Editar

        </button>




        <button

        class="btn btn-danger btn-sm"

        onclick="deleteTask(${task.id})">

        🗑 Eliminar

        </button>


        </td>


        `;


        table.appendChild(row);



    });


}






// ==========================================
// CREAR / ACTUALIZAR
// ==========================================

async function saveTask(event){


    event.preventDefault();



    const id =
    document.getElementById(
        "taskId"
    ).value;




    const titulo =
    document.getElementById(
        "titulo"
    )
    .value
    .trim();




    if(!titulo){


        showAlert(
            "El título es obligatorio.",
            "danger"
        );


        return;

    }





    const task = {


        titulo: titulo,


        descripcion:
        document.getElementById(
            "descripcion"
        ).value,



        prioridad:
        document.getElementById(
            "prioridad"
        ).value,



        estado:
        document.getElementById(
            "estado"
        ).value,



        fecha_vencimiento:
        document.getElementById(
            "fecha"
        ).value

    };






    const method =
    id
    ?
    "PUT"
    :
    "POST";



    const url =
    id
    ?
    `${API_URL}/${id}`
    :
    API_URL;





    try{


        const response =
        await fetch(

            url,

            {

                method: method,


                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(task)

            }

        );





        const result =
        await response.json();





        if(result.success){



            showAlert(

                id
                ?
                "Tarea actualizada correctamente."
                :
                "Tarea creada correctamente."

            );



            clearForm();


            loadTasks();


        }
        else{


            showAlert(

                result.errors.join("<br>"),

                "danger"

            );


        }



    }
    catch(error){


        showAlert(
            "Error guardando tarea.",
            "danger"
        );

    }


}







// ==========================================
// EDITAR
// ==========================================

function editTask(id){



    const task =
    tasks.find(
        t => t.id === id
    );



    if(!task)
        return;




    document.getElementById(
        "taskId"
    ).value =
    task.id;



    document.getElementById(
        "titulo"
    ).value =
    task.titulo;



    document.getElementById(
        "descripcion"
    ).value =
    task.descripcion;



    document.getElementById(
        "prioridad"
    ).value =
    task.prioridad;



    document.getElementById(
        "estado"
    ).value =
    task.estado;



    document.getElementById(
        "fecha"
    ).value =
    task.fecha_vencimiento;



    document.getElementById(
        "formTitle"
    ).innerText =
    "Editar tarea";


}







// ==========================================
// ELIMINAR
// ==========================================

async function deleteTask(id){



    if(
        !confirm(
        "¿Desea eliminar esta tarea?"
        )
    ){

        return;

    }




    try{


        const response =
        await fetch(

            `${API_URL}/${id}`,

            {

            method:"DELETE"

            }

        );



        const result =
        await response.json();




        if(result.success){


            showAlert(
                "Tarea eliminada correctamente."
            );


            loadTasks();

        }



    }
    catch(error){


        showAlert(
            "Error eliminando tarea.",
            "danger"
        );

    }


}







// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function clearForm(){



    document
    .getElementById(
        "taskForm"
    )
    .reset();



    document
    .getElementById(
        "taskId"
    )
    .value="";



    document
    .getElementById(
        "formTitle"
    )
    .innerText =
    "Nueva tarea";


}







// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard(data){



    let total =
    data.length;



    let pending =
    data.filter(
        t =>
        t.estado==="Pendiente"
    ).length;



    let progress =
    data.filter(
        t =>
        t.estado==="En progreso"
    ).length;



    let completed =
    data.filter(
        t =>
        t.estado==="Completada"
    ).length;



    let overdue =
    data.filter(
        t =>
        isOverdue(
            t.fecha_vencimiento
        )
    ).length;




    document.getElementById(
        "totalTasks"
    ).innerText =
    total;



    document.getElementById(
        "pendingTasks"
    ).innerText =
    pending;



    document.getElementById(
        "progressTasks"
    ).innerText =
    progress;



    document.getElementById(
        "completedTasks"
    ).innerText =
    completed;



    document.getElementById(
        "overdueTasks"
    ).innerText =
    overdue;




    let percent =

    total === 0

    ?

    0

    :

    Math.round(
        completed / total * 100
    );




    let bar =
    document.getElementById(
        "progressBar"
    );



    bar.style.width =
    percent+"%";


    bar.innerText =
    percent+"%";



    createCharts(data);

}








// ==========================================
// VALIDAR VENCIMIENTO
// ==========================================

function isOverdue(date){


    if(!date)
        return false;



    let today =
    new Date();



    let limit =
    new Date(date);



    return (
        limit < today
        &&
        limit.toDateString()
        !==
        today.toDateString()
    );

}







// ==========================================
// GRAFICOS
// ==========================================

function createCharts(data){



    let states={

        Pendiente:0,

        "En progreso":0,

        Completada:0

    };



    let priorities={

        Alta:0,

        Media:0,

        Baja:0

    };




    data.forEach(task=>{


        states[task.estado]++;


        priorities[task.prioridad]++;


    });







    if(statusChart){

        statusChart.destroy();

    }





    statusChart =
    new Chart(

        document.getElementById(
            "statusChart"
        ),

        {

        type:"pie",


        data:{


            labels:
            Object.keys(states),



            datasets:[{


                data:
                Object.values(states)



            }]


        }


        }

    );








    if(priorityChart){

        priorityChart.destroy();

    }






    priorityChart =
    new Chart(

        document.getElementById(
            "priorityChart"
        ),

        {

        type:"bar",


        data:{


            labels:
            Object.keys(priorities),



            datasets:[{


                label:
                "Cantidad",



                data:
                Object.values(priorities)


            }]

        }


        }

    );



}







// ==========================================
// FILTROS
// ==========================================

function applyFilters(){



    const text =
    document
    .getElementById(
        "search"
    )
    .value
    .toLowerCase();




    const status =
    document
    .getElementById(
        "filterStatus"
    )
    .value;




    const priority =
    document
    .getElementById(
        "filterPriority"
    )
    .value;






    const filtered =
    tasks.filter(

        task =>


        task.titulo
        .toLowerCase()
        .includes(text)



        &&



        (
            !status ||
            task.estado===status
        )



        &&



        (
            !priority ||
            task.prioridad===priority
        )


    );



    renderTasks(filtered);


}