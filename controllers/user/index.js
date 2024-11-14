let SAVE_MODAL;
let SAVE_FORM,
    ID_USUARIO,
    NOMBRE_USUARIO,
    CLAVE_USUARIO,
    CORREO_USUARIO,
    TELEFONO_USUARIO,
    DUI_USUARIO,
    NACIMIENTO_USUARIO,
    DIRECCION_USUARIO,
    ESTADO_USUARIO,
    REPETIR_CLAVE;
let SEARCH_FORM;
let ROWS_FOUND;

// Constantes para completar las rutas de la API.
const USUARIO_API = 'services/usuarios/usuarios.php';

async function loadComponent(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear Usuario';
    CLAVE_USUARIO.disabled = false;
    REPETIR_CLAVE.disabled = false;
    ESTADO_USUARIO.disabled = true;
    // Se prepara el formulario.
    SAVE_FORM.reset();
}
/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    try {
        // Se define un objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idUsuario', id);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(USUARIO_API, 'readOne', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra la caja de diálogo con su título.
            SAVE_MODAL.show();
            // Se inicializan los campos con los datos.
            const ROW = DATA.dataset;
            MODAL_TITLE.textContent = `Actualizar USUARIO: ${ROW.NOMBRE} ${ROW.APELLIDO}`;
            // Se prepara el formulario.
            SAVE_FORM.reset();
            ID_USUARIO.value = ROW.ID;
            NOMBRE_USUARIO.value = ROW.NOMBRE;
            CORREO_USUARIO.value = ROW.CORREO;
            TELEFONO_USUARIO.value = ROW.TELÉFONO;
            DUI_USUARIO.value = ROW.DUI;
            NACIMIENTO_USUARIO.value = ROW.NACIMIENTO;
            DIRECCION_USUARIO.value = ROW.DIRECCIÓN;
            ESTADO_USUARIO.checked = parseInt(ROW.VALOR_ESTADO);
            CLAVE_USUARIO.disabled = true;
            REPETIR_CLAVE.disabled = true;
            ESTADO_USUARIO.disabled = false;
        } else {
            sweetAlert(2, DATA.error, false);
        }
    } catch (Error) {
        console.log(Error);
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar usuario';
    }

}
/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction(`¿Desea eliminar el usuario ${nombre} de forma permanente?`);
    try {
        // Se verifica la respuesta del mensaje.
        if (RESPONSE) {
            // Se define una constante tipo objeto con los datos del registro seleccionado.
            const FORM = new FormData();
            FORM.append('idUsuario', id);
            // Petición para eliminar el registro seleccionado.
            const DATA = await fetchData(USUARIO_API, 'deleteRow', FORM);
            console.log(DATA.status);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se muestra un mensaje de éxito.
                await sweetAlert(1, DATA.message, true);
                // Se carga nuevamente la tabla para visualizar los cambios.
                fillTable();
            } else {
                sweetAlert(2, DATA.error, false);
            }
        }
    }
    catch (Error) {
        console.log(Error + ' Error al cargar el mensaje');
        confirmAction('¿Desea eliminar el usuario de forma permanente?');
    }

}


/*
*   Función asíncrona para cambiar el estado de un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openState = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmUpdateAction('¿Desea cambiar el estado del usuario?');
    try {
        // Se verifica la respuesta del mensaje.
        if (RESPONSE) {
            // Se define una constante tipo objeto con los datos del registro seleccionado.
            const FORM = new FormData();
            FORM.append('idUsuario', id);
            // Petición para eliminar el registro seleccionado.
            const DATA = await fetchData(USUARIO_API, 'changeState', FORM);
            console.log(DATA.status);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se muestra un mensaje de éxito.
                await sweetAlert(1, DATA.message, true);
                // Se carga nuevamente la tabla para visualizar los cambios.
                fillTable();
            } else {
                sweetAlert(2, DATA.error, false);
            }
        }
    }
    catch (Error) {
        console.log(Error + ' Error al cargar el mensaje');
    }

}

// Variables y constantes para la paginación
const UsuariosPorPagina = 10;
let paginaActual = 1;
let Usuarios = [];

// Función para cargar tabla de usuario con paginación
async function fillTable(form = null) {
    const cargarTabla = document.getElementById('tabla_usuarios');
    try {
        cargarTabla.innerHTML = '';
        // Petición para obtener los registros disponibles.
        let action;
        form ? action = 'searchRows' : action = 'readAll';
        const DATA = await fetchData(USUARIO_API, action, form);

        if (DATA.status) {
            Usuarios = DATA.dataset;
            mostrarUsuarios(paginaActual);
            // Se muestra un mensaje de acuerdo con el resultado.
            ROWS_FOUND.textContent = DATA.message;
        } else {
            // Se muestra un mensaje de acuerdo con el resultado.
            const tablaHtml = `
                <tr class="border-danger">
                    <td class="text-danger">${DATA.error}</td>
                </tr>
            `;
            cargarTabla.innerHTML += tablaHtml;
            ROWS_FOUND.textContent = "Existen 0 coincidencias";
        }
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

// Función para mostrar Usuarios en una página específica
function mostrarUsuarios(pagina) {
    const inicio = (pagina - 1) * UsuariosPorPagina;
    const fin = inicio + UsuariosPorPagina;
    const UsuariosPagina = Usuarios.slice(inicio, fin);

    const cargarTabla = document.getElementById('tabla_usuarios');
    cargarTabla.innerHTML = '';
    UsuariosPagina.forEach(row => {
        const estadoColor = row.ESTADO === 'Activo' ? 'green' : 'red';
        const tablaHtml = `
            <tr class="${getRowBackgroundColor(row.ESTADO)}">
                <td>${row.NOMBRE}</td>
                <td>${row.CORREO}</td>
                <td>${row.TELÉFONO}</td>
                <td>${row.NACIMIENTO}</td>
                <td>${row.DUI}</td>
                <td>${row.DIRECCIÓN}</td>
                <td class="${getRowColor(row.ESTADO)}">${row.ESTADO}</td>
                <td>
                    <button type="button" class="btn transparente" onclick="openState(${row.ID})">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="${estadoColor}" xmlns="http://www.w3.org/2000/svg">
                             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2v-6zm0 8h2v2h-2v-2z" stroke="currentColor" stroke-width="0.15"/>
                         </svg>
                    </button>
                    <button type="button" class="btn transparente" onclick="openUpdate(${row.ID})">
                        <img src="../../../resources/img/svg/icons_forms/pen 1.svg" width="18" height="18">
                    </button>
                    <button type="button" class="btn transparente" onclick="openDelete(${row.ID}, '${row.NOMBRE}')">
                        <img src="../../../resources/img/svg/icons_forms/trash 1.svg" width="18" height="18">
                    </button>
                </td>
            </tr>
        `;
        cargarTabla.innerHTML += tablaHtml;
    });

    actualizarPaginacion();
}

// Función para actualizar los controles de paginación
function actualizarPaginacion() {
    const paginacion = document.querySelector('.pagination');
    paginacion.innerHTML = '';

    const totalPaginas = Math.ceil(Usuarios.length / UsuariosPorPagina);

    if (paginaActual > 1) {
        paginacion.innerHTML += `<li class="page-item"><a class="page-link text-dark" href="#" onclick="cambiarPagina(${paginaActual - 1})">Anterior</a></li>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        paginacion.innerHTML += `<li class="page-item ${i === paginaActual ? 'active' : ''}"><a class="page-link text-light" href="#" onclick="cambiarPagina(${i})">${i}</a></li>`;
    }

    if (paginaActual < totalPaginas) {
        paginacion.innerHTML += `<li class="page-item"><a class="page-link text-dark" href="#" onclick="cambiarPagina(${paginaActual + 1})">Siguiente</a></li>`;
    }
}

// Función para cambiar de página
function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    mostrarUsuarios(paginaActual);
}


function getRowColor(estado) {
    switch (estado) {
        case 'Bloqueado':
            return 'text-danger';
        case 'Activo':
            return 'text-success';
        default:
            return '';
    }
}

function getRowBackgroundColor(estado) {
    switch (estado) {
        case 'Bloqueado':
            return 'border-danger';
        case 'Activo':
            return 'border-success';
        default:
            return '';
    }
}

// window.onload
window.onload = async function () {
    // Obtiene el contenedor principal
    const appContainer = document.getElementById('main');
    // Carga los components de manera síncrona
    const adminHtml = await loadComponent('../components/index.html');
    // Agrega el HTML del encabezado
    appContainer.innerHTML = adminHtml;
    //Agrega el encabezado de la pantalla
    const titleElement = document.getElementById('title');
    titleElement.textContent = 'Gestión de usuarios';
    // Cargar la tabla
    fillTable();
    ROWS_FOUND = document.getElementById('rowsFound');
    // Constantes para establecer los elementos del componente Modal.
    SAVE_MODAL = new bootstrap.Modal('#saveModal'),
        MODAL_TITLE = document.getElementById('modalTitle');

    // Constantes para establecer los elementos del formulario de guardar.
    SAVE_FORM = document.getElementById('saveForm'),
        ID_USUARIO = document.getElementById('idUsuario'),
        NOMBRE_USUARIO = document.getElementById('nombreUsuario'),
        CORREO_USUARIO = document.getElementById('correoUsuario'),
        TELEFONO_USUARIO = document.getElementById('telefonoUsuario'),
        DUI_USUARIO = document.getElementById('duiUsuario'),
        NACIMIENTO_USUARIO = document.getElementById('nacimientoUsuario'),
        CLAVE_USUARIO = document.getElementById('claveUsuario'),
        REPETIR_CLAVE = document.getElementById('confirmarClave'),
        DIRECCION_USUARIO = document.getElementById('direccionUsuario'),
        ESTADO_USUARIO = document.getElementById('estadoUsuario');
    // Método del evento para cuando se envía el formulario de guardar.
    SAVE_FORM.addEventListener('submit', async (event) => {
        // Se evita recargar la página web después de enviar el formulario.
        event.preventDefault();
        // Se verifica la acción a realizar.
        (ID_USUARIO.value) ? action = 'updateRow' : action = 'createRow';
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SAVE_FORM);
        // Petición para guardar los datos del formulario.
        const DATA = await fetchData(USUARIO_API, action, FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se cierra la caja de diálogo.
            SAVE_MODAL.hide();
            // Se muestra un mensaje de éxito.
            sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else if (!DATA.exception) {
            sweetAlert(2, DATA.error, false);
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    });
    // Constante para establecer el formulario de buscar.
    SEARCH_FORM = document.getElementById('searchForm');
    // Verificar si SEARCH_FORM está seleccionado correctamente
    console.log(SEARCH_FORM)
    // Método del evento para cuando se envía el formulario de buscar.
    SEARCH_FORM.addEventListener('submit', (event) => {
        // Se evita recargar la página web después de enviar el formulario.
        event.preventDefault();
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);
        console.log(SEARCH_FORM);
        console.log(FORM);
        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        fillTable(FORM);
    });
    // Llamada a la función para establecer la mascara del campo teléfono.
    vanillaTextMask.maskInput({
        inputElement: document.getElementById('telefonoUsuario'),
        mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    });
    // Llamada a la función para establecer la mascara del campo DUI.
    vanillaTextMask.maskInput({
        inputElement: document.getElementById('duiUsuario'),
        mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    const hoy = new Date();

    // Cálculo para la fecha máxima (mayores de 18 años)
    const fechaMaxima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());

    // Cálculo para la fecha mínima (máximo 122 años de antigüedad)
    const fechaMinima = new Date(hoy.getFullYear() - 122, hoy.getMonth(), hoy.getDate());

    // Convertir a formato YYYY-MM-DD para los atributos min y max
    const formatoISO = (fecha) => fecha.toISOString().split('T')[0];

    // Asignar el valor al campo de fecha
    NACIMIENTO_USUARIO.min = formatoISO(fechaMinima);
    NACIMIENTO_USUARIO.max = formatoISO(fechaMaxima);
};
