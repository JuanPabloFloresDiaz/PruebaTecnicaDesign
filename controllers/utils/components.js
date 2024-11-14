/*
*   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
*/
// Constante para establecer la ruta base del servidor.
const SERVER_URL = 'http://localhost/PruebaTecnica/api/';

/*
*   Función para mostrar un mensaje de confirmación. Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

const confirmUpdateAction = (message) => {
    return swal({
        title: 'Aviso',
        text: message,
        icon: 'info',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

/*
*   Función asíncrona para manejar los mensajes de notificación al usuario. Requiere la librería sweetalert para funcionar.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
const sweetAlert = async (type, text, timer, url = null) => {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }
    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar'
        }
    };
    // Se verifica el uso del temporizador.
    (timer) ? options.timer = 3000 : options.timer = null;
    // Se muestra el mensaje.
    await swal(options);
    // Se direcciona a una página web si se indica.
    (url) ? location.href = url : undefined;
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
const fillSelect = async (filename, action, select, selected = null) => {
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}

const fillSelectOptions = async (filename, action, select, selected = null) => {
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[2];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}


/*
*   Función asíncrona para cargar las opciones en un select de formulario con un arreglo de imagenes.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: un arreglo de objetos compuesto de la siguinte forma [{id: 1, imagen: 'dfs.png'},{id: 1, imagen: 'dfs.png'}].
*/
const fillSelectImage = async (filename, action, select, selected = null) => {
     // Petición para obtener los datos.
     const DATA = await fetchData(filename, action, null);
     let content = '';
     let imagenes = [];
     // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
     if (DATA.status) {
         content += '<option value="" selected>Seleccione una opción</option>';
         // Se recorre el conjunto de registros fila por fila a través del objeto row.
         DATA.dataset.forEach(row => {
             // Se obtiene el dato del primer campo.
             let value = Object.values(row)[0];
             // Se obtiene el dato del segundo campo.
             let text = Object.values(row)[1];
             // Se obtiene el dato del tercer campo.
             let imagen = Object.values(row)[2];
 
             imagenes.push({id: value, imagen: imagen});
             // Se verifica cada valor para enlistar las opciones.
             if (value != selected) {
                 content += `<option value="${value}">${text}</option>`;
             } else {
                 content += `<option value="${value}" selected>${text}</option>`;
             }
         });
     } else {
         content += '<option value="0">No hay opciones disponibles</option>';
     }
     // Se agregan las opciones a la etiqueta select mediante el id.
     document.getElementById(select).innerHTML = content;
 
     // Retornar el arreglo de objetos con las imágenes.
     return imagenes;
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario con post, en su mayroía
*   se usa para funciones en el que el select depende de algun id, es decir, selec especificos.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
const fillSelectPost = async (filename, action, select, form, selected = null) => {
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action, form);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option value="0">No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}

// /*
// *   Función para mostrar la opcion seleccionada de un formulario en base a opciones ya predefinidas.
// *   Parámetros: selectedElement (identificar el id del select en el forms), valueToSelect (Opcion que queremos mostrar en el select, comparara si esta opcion se encuentra en el select).
// *   Retorno: ninguno.
// */
function preselectOption(selectElement, valueToSelect) {
    // Seleccionar el elemento select
    const select = document.getElementById(selectElement);

    // Recorrer las opciones del select
    for (const option of select.options) {
        if (option.value === valueToSelect) {
            // Seleccionar la opción coincidente
            option.selected = true;

            // Si hay un input asociado, asignar el valor seleccionado
            const associatedInput = document.getElementById(`${selectElement}-input`);
            if (associatedInput) {
                associatedInput.value = valueToSelect;
            }
            break; // Detener el bucle una vez encontrada la opción
        }
    }
}

/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOut = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const DATA = await fetchData(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
const fetchData = async (filename, action, form = null) => {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }

    // Asegúrate de que spiderWeb retorne la variable key
    let { key } = await spiderWeb(); // Desestructuración para obtener la key
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se agrega un parámetro con el valor de la key.
        PATH.searchParams.append('key', key);
        // Se define una constante tipo objeto con la respuesta de la petición.
        let RESPONSE = await fetch(PATH.href, OPTIONS);
        return await RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}

/*
* Función asincrona para corroborar que el sistema envia la solicitud
*
*
*
*/
async function spiderWeb() {
    // Crear variables con el día, mes y año actuales
    const now = new Date();
    const dia = now.getDate();
    const mes = now.getMonth() + 1;
    const año = now.getFullYear();

    // Crear variable resultado de la operación "(año/mes) / dia"
    const operacion = (año / mes) / dia;

    // Crear variable con el minuto del día
    const hora = now.getHours();
    const minutos = now.getMinutes();
    const minutosDelDia = (hora * 60) + minutos;

    // Calcular el múltiplo de la operación más cercano al minuto del día
    const multiplo = Math.round(minutosDelDia / operacion) * operacion;

    // Crear variable arreglo llamada numeros_primos
    const numeros_primos = [3, 5, 7, 11, 13];

    // Crear variable con un número random del 0 al 4
    const randomIndex = Math.floor(Math.random() * 5); // 0 al 4

    // Crear variable "exponente" con el número del arreglo en la posición de randomIndex
    const exponente = numeros_primos[randomIndex];

    // Crear variable key con la ecuación: "√(multiplo ^ multiplo)"
    const key = Math.sqrt(Math.pow(multiplo, exponente));

    // Encriptar la key usando AES-256-CBC
    const encryptedKey = await encryptAES(key.toString(), "califragilisticoespialidoso");

    // Retornar la variable key encriptada
    return { key: encryptedKey };
}

// Función para encriptar usando AES-256-CBC
async function encryptAES(plaintext) {
    const key = "califragilisticoespialidoso"; 
    const encoder = new TextEncoder();
    const encodedKey = encoder.encode(key.padEnd(32)); // Asegurarse de que la clave tenga 32 bytes
    const encodedText = encoder.encode(plaintext);

    // Crear vector de inicialización (IV) aleatorio
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // Importar la clave AES
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw', 
        encodedKey, 
        { name: 'AES-CBC' }, 
        false, 
        ['encrypt']
    );

    // Encriptar el texto plano
    const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv }, 
        cryptoKey, 
        encodedText
    );

    // Convertir a Base64URL
    const encryptedArray = new Uint8Array(encrypted);
    const base64 = btoa(String.fromCharCode(...encryptedArray));
    const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Base64URL

    // Retornar el IV concatenado con el texto cifrado en Base64URL
    return `${base64url}.${Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('')}`;
}



const stackedBarLineGraph = (canvas, xAxis, data, barLegend, title) => {
    let barColors = [];
    let lineColor = '#FF5733'; // Color para la línea

    // Generar colores aleatorios para las barras
    xAxis.forEach(() => {
        barColors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    new Chart(document.getElementById(canvas), {
        type: 'bar', // Tipo de gráfico principal
        data: {
            labels: xAxis,
            datasets: [
                {
                    type: 'bar', // Dataset para las barras
                    label: barLegend,
                    data: data,
                    backgroundColor: barColors,
                    stack: 'stack1' // Apilar barras
                },
                {
                    type: 'line', // Dataset para la línea
                    label: 'Línea',
                    data: data,
                    borderColor: lineColor,
                    backgroundColor: 'rgba(255, 87, 51, 0.2)', // Color de fondo para la línea (transparente)
                    fill: false, // La línea no estará rellena
                    tension: 0.1 // Para suavizar la línea
                }
            ]
        },
        options: {
            scales: {
                x: {
                    stacked: true // Apilar barras en el eje X
                },
                y: {
                    stacked: true // Apilar barras en el eje Y
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: true
                }
            }
        }
    });
}




/*
*   Función para generar un gráfico de barras verticales. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/

// Variable que guardara la grafica que se cree
let Bargraph = null;
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    //Verifica si la variable graph cuenta con una grafica previamente creada, si es si entonces la va destruir
    if (Bargraph) {
        Bargraph.destroy();
    }

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    Bargraph = new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        }
    });
}

let Bargraph1 = null;

const barGraph1 = (canvas, xAxis, yAxis, legend, title) => {
    const generateGradient = (ctx, color) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color.replace('0.8)', '0.4)'));
        return gradient;
    };

    const colors = xAxis.map(() => `hsla(${Math.floor(Math.random() * 360)}, 70%, 60%, 0.8)`);

    if (Bargraph1) {
        Bargraph1.destroy();
    }

    const ctx = document.getElementById(canvas).getContext('2d');

    Bargraph1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors.map(color => generateGradient(ctx, color)),
                borderColor: colors.map(color => color.replace('0.8)', '1)')),
                borderWidth: 2,
                borderRadius: 10,
                borderSkipped: false,
                hoverBackgroundColor: colors.map(color => color.replace('0.8)', '0.9)')),
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: false,
                    text: title,
                    font: {
                        size: 24,
                        weight: 'bold',
                        family: "'Poppins', sans-serif"
                    },
                    padding: {
                        top: 20,
                        bottom: 30
                    },
                    color: '#333'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 15,
                        padding: 15,
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        },
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: {
                        size: 16,
                        family: "'Poppins', sans-serif"
                    },
                    bodyFont: {
                        size: 14,
                        family: "'Poppins', sans-serif"
                    },
                    padding: 12,
                    cornerRadius: 6,
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.parsed.y}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12,
                            family: "'Poppins', sans-serif"
                        },
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    border: {
                        dash: [4,4]
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            family: "'Poppins', sans-serif"
                        },
                        color: '#666'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 10
                }
            }
        }
    });
}

const lineGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: true
                }
            }
        }
    });
}

const lineGraph1 = (canvas, xAxis, yAxis, legend, title) => {
    const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ab'];
    
    new Chart(document.getElementById(canvas), {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: legend,
          data: yAxis,
          backgroundColor: colors[0] + '80',
          borderColor: colors[0],
          pointBackgroundColor: colors[0],
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors[0],
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 18,
              family: 'Arial',
              weight: 'bold',
            },
            color: '#333',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                return `${legend}: ${context.parsed.y}`;
              }
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 12,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mes',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#333',
            },
            grid: {
              display: false,
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de lesiones',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#333',
            },
            grid: {
              color: 'rgba(200,200,200,0.2)',
            },
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce',
        }
      }
    });
  }

  const lineGraph2 = (canvas, xAxis, yAxis, legend, title) => {
    const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ab'];
    
    new Chart(document.getElementById(canvas), {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: legend,
          data: yAxis,
          backgroundColor: colors[0] + '80',
          borderColor: colors[0],
          pointBackgroundColor: colors[0],
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors[0],
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 18,
              family: 'Arial',
              weight: 'bold',
            },
            color: '#333',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                return `${legend}: ${context.parsed.y}`;
              }
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 12,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mes',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#333',
            },
            grid: {
              display: false,
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de pagos',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#333',
            },
            grid: {
              color: 'rgba(200,200,200,0.2)',
            },
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce',
        }
      }
    });
  }


const lineGraphWithFill = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                borderColor: 'rgba(2, 8, 135, 1)',
                backgroundColor: 'rgba(2, 8, 135, 0.4)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                },
            }
        }
    });
}


/*
*   Función para generar un gráfico de pastel. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
// Variable que guardara la grafica que se cree
let graph = null;
const DoughnutGraph = (canvas, legends, values, title, titlebool = 1) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    //Verifica si la variable graph cuenta con una grafica previamente creada, si es si entonces la va destruir
    if (graph) {
        graph.destroy();
    }

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    graph = new Chart(document.getElementById(canvas), {
        type: 'doughnut',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: titlebool,
                    text: title,

                }
            }
        }
    });
}

let graph3 = null;
const DoughnutGraph3 = (canvas, legends, values, title, titlebool = 1) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    //Verifica si la variable graph cuenta con una grafica previamente creada, si es si entonces la va destruir
    if (graph3) {
        graph3.destroy();
    }

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    graph3 = new Chart(document.getElementById(canvas), {
        type: 'doughnut',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: titlebool,
                    text: title
                }
            }
        }
    });
}
/*
*   Función para generar un gráfico de polar. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/

const PolarAreaGraph = (canvas, legends, values, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    // Verifica si la variable graph cuenta con una gráfica previamente creada, si es así, entonces la va a destruir.
    if (graph) {
        graph.destroy();
    }

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    graph = new Chart(document.getElementById(canvas), {
        type: 'polarArea',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    pointLabels: {
                        display: true,
                        centerPointLabels: true,
                        font: {
                            size: 18
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}


/*
*   Función para generar un gráfico de radar. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), labels (etiquetas para el gráfico), data (valores de los datos), legend (etiqueta para los datos), title (título del gráfico), options (opciones adicionales para la configuración del gráfico).
*   Retorno: instancia del gráfico.
*/
const radarGraph = (canvas, labels, data, legend, title, options = {}) => {
    // Configuración por defecto para el gráfico de radar.
    const defaultOptions = {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: legend,
                data: data
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: true
                }
            }
        }
    };

    // Fusiona las opciones por defecto con las opciones adicionales.
    const config = {
        ...defaultOptions,
        ...options,
        options: {
            ...defaultOptions.options,
            ...options.options
        }
    };

    // Crea y retorna la instancia del gráfico.
    return new Chart(document.getElementById(canvas), config);
}


const lineTwoGraph = (canvas, xAxis, yAxis, legend, texty, textx) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
  
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
      colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
     //Verifica si la variable graph cuenta con una grafica previamente creada, si es si entonces la va destruir
     if (graph) {
        graph.destroy();
    }
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    graph = new Chart(document.getElementById(canvas), {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: legend,
          data: yAxis,
          backgroundColor: colors,
          borderColor: colors,
          pointStyle: 'circle', // Estilo de punto, puede ser 'circle', 'rect', 'triangle', etc.
          pointRadius: 5, // Tamaño del punto
          pointHoverRadius: 7 // Tamaño del punto al pasar el cursor
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false, // Cambiado a false para no mostrar el título
          },
          legend: {
            display: true // Cambiado a true para mostrar la leyenda
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: textx
            }
          },
          y: {
            title: {
              display: true,
              text: texty
            }
          }
        }
      }
    });
  }


/*
*  Función para generar un tab con enlaces para mejorar la navegabilidad en la página.
*  Parametros: 
*  1. id del contendor del tab (preferiblemente que sea un div)
*  2. Arreglo de titulos de los tabs, ejem: ['Entrenamientos', 'Jugadores', 'Equipos']
*  3. Arreglo de links de los tabs, ejem: ['../pages/entrenamientos.html', '../pages/jugadores.html', '../pages/equipos.html']
*  4. Titulo del tab
*  Retorno: ninguno.
*  PUNTOS A PONER ATENCIÓN
*  La lógica es que titulos[0] debe ser pareja de links[0]
*  debes de tener un div con un id que se le pase como parametro
*  debes de usar el css de style.css en tu página web, ejemplo en:
*  Specific_details_contents.html
*/

const insertTag = (idContainer, titulos, links, titulo_tab) => {
    // Verificación de que los arreglos de títulos y links tengan la misma longitud
    if (titulos.length !== links.length) {
        console.error('La cantidad de títulos y links no coinciden, la longitud debe ser igual en ambos arreglos');
        return;
    }

    // Obtener el contenedor por su ID
    const container = document.getElementById(idContainer);

    // Verificación de que el contenedor exista
    if (!container) {
        console.error(`No se encontró ningún elemento con el ID del contenedor: ${idContainer}`);
        return;
    }

    // Crear el HTML para el tab
    const cardHtml = document.createElement('div');
    cardHtml.className = 'card2 mt-4';
    cardHtml.innerHTML = `
        <span class="title2">${titulo_tab}</span>
        <div class="card__tags">
            <ul class="tag"></ul>
        </div>
    `;

    // Obtener la lista dentro de la tarjeta
    const ul = cardHtml.querySelector('ul.tag');

    // Iterar sobre los títulos y links para crear los elementos <li> con los enlaces
    titulos.forEach((titulo, index) => {
        const li = document.createElement('li');
        li.className = 'tag__name';
        
        // Crear el enlace
        const a = document.createElement('a');
        a.href = links[index];
        a.textContent = titulo;
        a.classList.add('color_white');
        a.style.textDecoration = 'none'; // Opcional: para quitar el subrayado del enlace
        
        // Agregar el enlace dentro del <li>
        li.appendChild(a);
        
        // Agregar el <li> a la lista
        ul.appendChild(li);
    });

    // Insertar la tarjeta dentro del contenedor
    container.appendChild(cardHtml);
};

  
