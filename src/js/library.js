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

function procesarSolicitud(arr) {

    // 1. Sacar el nombre del usuario (primer elemento)
    let nombreUsuario = arr[0];

    // 2. Añadir al inicio del array "Carné de socio"
    arr.unshift("Carné de socio");

    // 3. Añadir al final del array el nombre del usuario
    arr.push(nombreUsuario);

    // 4. Devolver el array modificado
    return arr;
}


// =======================
// PRUEBA DE LA FUNCIÓN
// =======================

let solicitud = ["Dylan", "El principito", "Cien años de soledad"];

let resultado = procesarSolicitud(solicitud);

console.log("Resultado de la solicitud:");
console.log(resultado);