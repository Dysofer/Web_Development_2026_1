// Prestamo de libros
// Funcion que se llame procesar solicitud
//procesarSolicitud (nombreUsuario, libro1)
//Sacar el nombre del usuario como primer elemento
//Añadir al inicio del array la cadena "Carne de socio", ya que se entrega con cada solicitud
//Añadir al final del array el nombre del usuario, el libro solicitado y la fecha de solicitud
//Devolver el array modificado 

// =======================================
// PRÉSTAMO DE LIBROS
// =======================================

// ===============================
// FUNCIÓN PRINCIPAL
// ===============================

function procesarSolicitud(arr) {

    let nombreUsuario = arr[0];

    arr.unshift("Carné de socio");

    arr.push(nombreUsuario);

    return arr;
}


// ===============================
// CONECTAR CON EL HTML
// ===============================

function procesar() {

    let nombre = document.getElementById("userName").value;
    let libro = document.getElementById("book").value;

    if (nombre === "" || libro === "") {
        alert("Debes llenar ambos campos");
        return;
    }

    let solicitud = [nombre, libro];

    let resultado = procesarSolicitud(solicitud);

    document.getElementById("resultado").innerText =
        "Resultado: " + JSON.stringify(resultado);
}