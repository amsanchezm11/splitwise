class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    // Completar con los métodos necesarios
    aniadirGasto(gasto) {
        this.gastos.push(gasto);
    }

    calcularGastos() {
        return this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
    }
}


class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
    // Completar con los métodos necesarios
}

// CREAMOS A LOS USUARIOS

let juan = new Usuario("Juan", "img/usuarios/avatar_a.png");
let pepe = new Usuario("Pepe", "img/usuarios/avatar_b.png");
let borja = new Usuario("Borja", "img/usuarios/avatar_c.png");



// CREAMOS LAS CARTAS
let contenedorResumen = document.getElementById("resumen");
let carta = document.createElement("div");


// VALIDACION FORMULARIO

// USUARIO
let usuario = document.getElementById("usuario");
function checkUsuario(element) {

    let regex = /^(Juan|Pepe|Borja)$/;
    comprobarRegex(element, regex);
    // TEXTO ADMITE --> LOS VALORES JUAN | PEPE | BORJA 
}

// TITULO
let titulo = document.getElementById("titulo");

function checkTitulo(element) {

    let regex = /^[A-Za-z0-9]{1,20}$/;
    comprobarRegex(element, regex);
    // TEXTO ADMITE --> LETRAS MINUSCULAS-MAYUSCULAS Y NUMEROS EN UN RANGO DE 1 A 20 CARACTERES
}

// IMPORTE
let importe = document.getElementById("importe");

function checkImporte(element) {

    let regex = /^(1000\.00|[0-9]{1,3}\.[0-9]{2})$/;
    // TEXTO ADMITE --> NUMEROS ENTRE 0.00 Y 1000.00 CON PARTE DECIMAL DE 2 DIGITOS EXACTOS Y SEPARACIÓN POR "."          
    comprobarRegex(element, regex);

}

// IMPORTE
let fecha = document.getElementById("fecha");

function checkFecha(element) {

    let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20(2[4-9]|[3-9][0-9]))$/;

    // DIA --> 01 AL 31
    // MES --> 01 AL 12
    // AÑO --> PRINCIPIO DEL AÑO DEBE SER 20 Y EL RESTO DESDE 24 AL 99

    comprobarRegex(element, regex);
}

// FUNCION VALIDAR REGEX
function comprobarRegex(element, regex) {

    if (regex.test(element.value)) {
        element.setAttribute("class", "verde");
    } else {
        element.setAttribute("class", "rojo");
    }

}

// FUNCION COMPROBAR INPUTS CON EL BOTON

let botonAniadir = document.getElementById("aniadir");
botonAniadir.onclick = checkInputs;

function checkInputs() {
    checkUsuario(usuario);
    checkTitulo(titulo);
    checkImporte(importe);
    checkFecha(fecha);


    if (usuario.className == "rojo" | titulo.className == "rojo" | importe.className == "rojo" | fecha.className == "rojo") {
        alert("Los campos en ROJO están mal escritos");
    } else {
        let gasto = new Gasto(titulo.value, parseFloat(importe.value), fecha.value);
        console.log(gasto);

        if (usuario.value == borja.nombre) {
            borja.aniadirGasto(gasto);
            crearCarta(borja, gasto);   
            modificarDeuda(borja)      
        } else if (usuario.value == juan.nombre) {
            juan.aniadirGasto(gasto);
            crearCarta(juan, gasto);
            modificarDeuda(juan)       
        } else if (usuario.value == pepe.nombre) {
            pepe.aniadirGasto(gasto);
            crearCarta(pepe, gasto);
            modificarDeuda(pepe)       
        }


        console.log(borja.gastos);
        //usuario.gastos.push(gasto);
    }

}

function crearCarta(usuario, gasto) {

    let contenedorResumen = document.getElementById("resumen");

    let contenedorCarta = document.createElement("div");
    //contenedorCarta.setAttribute("id", usuario.nombre);
    contenedorCarta.setAttribute("class", "card mb-12 espacio");

    let fila = document.createElement("div");
    fila.setAttribute("class", "row g-0");

    let columna1 = document.createElement("div");
    columna1.setAttribute("class", "col-md-2");

    let imagen = document.createElement("img");
    imagen.setAttribute("src", usuario.pathImg);
    imagen.setAttribute("class", "img-fluid rounded-start");


    let columna2 = document.createElement("div");
    columna2.setAttribute("class", "col-md-10");


    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.innerHTML = usuario.nombre;

    let p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.innerHTML = "Pagó " + gasto.monto + "&euro; el " + gasto.fecha + ".";


    columna1.appendChild(imagen);

    cardBody.append(h5, p);
    columna2.appendChild(cardBody);

    fila.append(columna1, columna2);

    contenedorCarta.appendChild(fila);

    contenedorResumen.appendChild(contenedorCarta);

}


function crearCuenta(usuario) {

        let contenedorCuenta = document.getElementById("cuenta");

        let contenedorCarta = document.createElement("div");
        contenedorCarta.setAttribute("class", "card mb-12 espacio");

        let fila = document.createElement("div");
        fila.setAttribute("class", "row g-0");

        let columna1 = document.createElement("div");
        columna1.setAttribute("class", "col-md-2");

        let imagen = document.createElement("img");
        imagen.setAttribute("src", usuario.pathImg);
        imagen.setAttribute("class", "img-fluid rounded-start");


        let columna2 = document.createElement("div");
        columna2.setAttribute("class", "col-md-10");


        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = usuario.nombre;

        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.setAttribute("id",`${usuario.nombre}`);
        p.innerHTML = "Ha pagado 0 &euro;.";

        columna1.appendChild(imagen);

        cardBody.append(h5, p);
        columna2.appendChild(cardBody);

        fila.append(columna1, columna2);

        contenedorCarta.appendChild(fila);

        contenedorCuenta.appendChild(contenedorCarta);
 
}


let usuarios= [borja,pepe,juan];

function calcularDeudas(usuario){
  
    let totalPagado = 0;
    let deuda = 0;
    for (let i = 0; i < usuarios.length; i++) {
        totalPagado += usuarios[i].calcularGastos();    
    }

    let contribucionPersona = totalPagado / usuarios.length;

    deuda = usuario.calcularGastos() - contribucionPersona;

    return deuda;
}


function modificarDeuda(usuario) {
    
    let parrafo = document.getElementById(`${usuario.nombre}`);

        // corregir
    parrafo.innerHTML = "Ha pagado " + usuario.calcularGastos() + "&euro; " + 
                   (calcularDeudas(usuario) > 0 ? "se le debe " : "debe pagar ") + 
                   Math.abs(calcularDeudas(usuario)) + "&euro;.";
}

console.log(borja.calcularGastos());

console.log(juan.calcularGastos());

console.log(pepe.calcularGastos());

crearCuenta(borja);
crearCuenta(juan);
crearCuenta(pepe);