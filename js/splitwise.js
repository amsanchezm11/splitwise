// CLASE USUARIO
class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    // MÉTODO ANIADIR GASTO --> AÑADE EL GASTO AL ARRAY DE GASTOS DEL USUARIO
    aniadirGasto(gasto) {
        this.gastos.push(gasto);
    }

    // MÉTODO CALCULAR GASTO --> CALCULA EL GASTO TOTAL DEL USUARIO
    calcularGastos() {
        return this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
    }
}

// CLASE GASTO
class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
}

// CREAMOS A LOS USUARIOS
let juan = new Usuario("Juan", "img/usuarios/avatar_a.png");
let pepe = new Usuario("Pepe", "img/usuarios/avatar_b.png");
let borja = new Usuario("Borja", "img/usuarios/avatar_c.png");

// LOS GUARDAMOS EN UN ARRAY QUE LUEGO UTILIZAREMOS PARA ITERAR SOBRE LOS USUARIOS
let usuarios = [borja, pepe, juan];

// VALIDACION FORMULARIO

// FUNCIÓN CHECKUSUARIO
// PARAMETROS --> OBTIENE EL CAMPO DEL INPUT(element) A VALIDAR
//¿QUÉ HACE LA FUNCIÓN?--> CREA LA REGEX PARA VALIDAR EL NOMBRE DE USUARIO Y SE LOS PASA A LA FUNCIÓN comprobarRegex()
let usuario = document.getElementById("usuario");
function checkUsuario(element) {

    let regex = /^(Juan|Pepe|Borja)$/;
    comprobarRegex(element, regex);
    // TEXTO ADMITE --> LOS VALORES JUAN | PEPE | BORJA 
}

// TITULO
let titulo = document.getElementById("titulo");

// FUNCIÓN CHECKTITULO
// PARAMETROS --> OBTIENE EL CAMPO DEL INPUT(element) A VALIDAR
//¿QUÉ HACE LA FUNCIÓN?--> CREA LA REGEX PARA VALIDAR EL TITULO Y SE LOS PASA A LA FUNCIÓN comprobarRegex()
function checkTitulo(element) {

    let regex = /^[A-Za-z0-9]{1,20}$/;
    comprobarRegex(element, regex);
    // TEXTO ADMITE --> LETRAS MINUSCULAS-MAYUSCULAS Y NUMEROS EN UN RANGO DE 1 A 20 CARACTERES
}

// IMPORTE
let importe = document.getElementById("importe");

// FUNCIÓN CHECKIMPORTE
// PARAMETROS --> OBTIENE EL CAMPO DEL INPUT(element) A VALIDAR
//¿QUÉ HACE LA FUNCIÓN?--> CREA LA REGEX PARA VALIDAR EL IMPORTE Y SE LOS PASA A LA FUNCIÓN comprobarRegex()
function checkImporte(element) {

    let regex = /^(1000\.00|[0-9]{1,3}\.[0-9]{2})$/;
    // TEXTO ADMITE --> NUMEROS ENTRE 0.00 Y 1000.00 CON PARTE DECIMAL DE 2 DIGITOS EXACTOS Y SEPARACIÓN POR "."          
    comprobarRegex(element, regex);

}

// FECHA
let fecha = document.getElementById("fecha");

// FUNCIÓN CHECKFECHA
// PARAMETROS --> OBTIENE EL CAMPO DEL INPUT(element) A VALIDAR
//¿QUÉ HACE LA FUNCIÓN?--> CREA LA REGEX PARA VALIDAR LA FECHA Y SE LOS PASA A LA FUNCIÓN comprobarRegex()
function checkFecha(element) {

    let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20(2[4-9]|[3-9][0-9]))$/;

    // DIA --> 01 AL 31
    // MES --> 01 AL 12
    // AÑO --> PRINCIPIO DEL AÑO DEBE SER 20 Y EL RESTO DESDE 24 AL 99

    // LLAMAMOS A LA FUNCION COMPROBAR REGEX
    comprobarRegex(element, regex);
}

// FUNCIÓN VALIDAR REGEX
// PARAMETROS --> SE LE INGRESA POR PARAMETROS EL CAMPO A VALIDAR Y LA REGEX CORRESPONDIENTE PARA DICHA VALIDACIÓN
//¿QUÉ HACE LA FUNCIÓN?--> VALIDA EL VALOR DEL CAMPO INGRESADO(elemen.value) EN CASO AFIRMATIVO SE LE PONDRÁ LA CLASE "verde"
//                         EN CASO NEGATIVO SE LE PONDRÁ LA CLASE "rojo"
function comprobarRegex(element, regex) {
    // SI CUMPLE LA CONDICIÓN DEL REGEX EL BORDE DEL INPUT SE PONE DE COLOR VERDE, EN CASO NEGATIVO SE PONE DE COLOR ROJO
    if (regex.test(element.value)) {
        element.setAttribute("class", "verde");
    } else {
        element.setAttribute("class", "rojo");
    }
}

// EVENTO DE CLICK --> CHECK INPUTS(CON BOTON)
let botonAniadir = document.getElementById("aniadir");
botonAniadir.onclick = checkInputs;

// FUNCIÓN CHECK INPUTS 
//¿QUÉ HACE LA FUNCIÓN?--> LLAMA AL RESTO DE FUNCIONES QUE CHEKEAN LOS INPUTS Y COMPRUEBA QUE TODOS LOS INPUTS ESTÉN CORRECTAMENTE ESCRITOS
//                         EN CASO DE QUE ALGUN CAMPO FALTE O ESTÉ MAL ESCRITO SE LE NOTIFICARÁ AL USUARIO A TRAVÉS DE UN ALERT
function checkInputs() {
    checkUsuario(usuario);
    checkTitulo(titulo);
    checkImporte(importe);
    checkFecha(fecha);

    // SI ALGUNO DE LOS INPUTS CHECKEADOS CONTIENE LA CLASE ROJO SALTA EL ALERT DE ERROR 
    // EN CASO CONTRARIO SE REGISTRA EL GASTO
    if (usuario.className == "rojo" || titulo.className == "rojo" || importe.className == "rojo" || fecha.className == "rojo") {
        alert("Algunos campos están mal escritos");
    } else {
        // SE CREA EL GASTO
        let gasto = new Gasto(titulo.value, parseFloat(importe.value), fecha.value);
        // REGISTRAMOS EL GASTO EN EL USUARIO
        registrarGasto(usuario.value, gasto);
        // MENSAJE DE QUE SE HA AÑADIDO CORRECTAMENTE
        alert("Gasto añadido CORRECTAMENTE");
        // RESETEAMOS LOS VALORES DE LOS INPUTS
        usuario.value = "";
        titulo.value = "";
        importe.value = "";
        fecha.value = "";
        // RESETEO LAS CLASES DE LOS INPUTS PARA QUE NO SE LE QUEDE EL COLOR VERDE DEL BORDER
        usuario.className= "";
        titulo.className= "";
        importe.className="";
        fecha.className="";
    }
}

// FUNCION REGISTRAR GASTO DEL USUARIO
// PARAMETROS --> SE LE INGRESA POR PARAMETROS EL NOMBRE DEL USUARIO Y EL GASTO REALIZADO
// ¿QUÉ HACE LA FUNCIÓN? --> RECORRE EL ARRAY DE USUARIOS EN BUSCA DEL USUARIO CON EL MISMO NOMBRE QUE EL PARAMETRO
//                           UNA VEZ ENCONTRADO AÑADE EL GASTO AL USUARIO, 
//                           MODIFICA TODOS LOS VALORES DE CADA USUARIO QUE LUEGO SE LE PASA AL APARTADO CUENTAS
//                           Y SE CREA LA CARTA EN LA PESTAÑA DE RESUMEN 
function registrarGasto(usuarioNombre, gasto) {
    usuarios.forEach(usuario => {
        if (usuarioNombre === usuario.nombre) {
            usuario.aniadirGasto(gasto);
            modificarDeuda();
            crearCarta(usuario, gasto);
        }
    });
}

//FUNCIÓN CREAR CARTA AL USUARIO
// PARAMETROS --> SE LE INGRESA POR PARAMETROS EL USUARIO QUE HA REALIZADO EL GASTO Y EL PROPIO GASTO
// ¿QUÉ HACE LA FUNCIÓN? --> CREA LA CARTA QUE CONTENDRÁ EL RESUMEN DEL GASTO(TITULO,FECHA E IMPORTE) Y EL USUARIO QUE LO REALIZÓ JUNTO CON SU FOTO
function crearCarta(usuario, gasto) {

    // SELECCIÓN DEL ELEMENTO PADRE
    let contenedorResumen = document.getElementById("resumen");

    // CREACION DE ELEMENTOS:

    // DIV CONTENEDOR CARTA
    let contenedorCarta = document.createElement("div");
    contenedorCarta.setAttribute("class", "card mb-12 espacio");
    // DIV FILA
    let fila = document.createElement("div");
    fila.setAttribute("class", "row g-0");
    // DIV COLUMNA 1
    let columna1 = document.createElement("div");
    columna1.setAttribute("class", "col-md-2");
    // IMAGEN
    let imagen = document.createElement("img");
    imagen.setAttribute("src", usuario.pathImg);
    imagen.setAttribute("class", "img-fluid rounded-start");
    // DIV COLUMNA 2
    let columna2 = document.createElement("div");
    columna2.setAttribute("class", "col-md-10");
    // BODY DE LA CARTA
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    // H5
    let h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.innerHTML = usuario.nombre;
    // PARRAFO
    
    let p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.innerHTML = "Pagó " + gasto.monto + "&euro; el " + gasto.fecha + ".";

    // SE AÑADEN LOS ELEMENTOS HIJOS A LOS ELEMENTOS PADRES CORRESPONDIENTES
    columna1.appendChild(imagen);
    cardBody.append(h5, p);
    columna2.appendChild(cardBody);
    fila.append(columna1, columna2);
    contenedorCarta.appendChild(fila);
    contenedorResumen.appendChild(contenedorCarta);
}

// FUNCION CREAR CUENTA DEL USUARIO --> TARJETAS DE LA PESTAÑA CUENTA
// PARAMETROS --> SE LE INGRESA POR PARAMETROS EL USUARIO
// ¿QUÉ HACE LA FUNCIÓN? --> CREA LA CARTA QUE CONTENDRÁ LA CUENTA FINAL DE LOS GASTOS
function crearCuenta(usuario) {
    // SELECCION DEL ELEMENTO PADRE
    let contenedorCuenta = document.getElementById("cuenta");

    // CREACION DE ELEMENTOS:

    // DIV CONTENEDOR CARTA
    let contenedorCarta = document.createElement("div");
    contenedorCarta.setAttribute("class", "card mb-12 espacio");
    // DIV FILA
    let fila = document.createElement("div");
    fila.setAttribute("class", "row g-0");
    // DIV COLUMNA 1
    let columna1 = document.createElement("div");
    columna1.setAttribute("class", "col-md-2");
    // IMAGEN
    let imagen = document.createElement("img");
    imagen.setAttribute("src", usuario.pathImg);
    imagen.setAttribute("class", "img-fluid rounded-start");
    // DIV COLUMNA 2
    let columna2 = document.createElement("div");
    columna2.setAttribute("class", "col-md-10");
    // BODY DE LA CARTA
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    // H5
    let h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.innerHTML = usuario.nombre;
    // PARRAFO
    let p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.setAttribute("id", `${usuario.nombre}`);   // SE LE AÑADE EL NOMBRE USUARIO COMO ID PARA LUEGO PODER MODIFICARLE EL CONTENIDO
    p.innerHTML = "Ha pagado 0 &euro; se le debe 0&euro;.";

    // SE AÑADEN LOS ELEMENTOS HIJOS A LOS ELEMENTOS PADRES CORRESPONDIENTES
    columna1.appendChild(imagen);
    cardBody.append(h5, p);
    columna2.appendChild(cardBody);
    fila.append(columna1, columna2);
    contenedorCarta.appendChild(fila);
    contenedorCuenta.appendChild(contenedorCarta);
}

// FUNCION MODIFICAR DEUDA DEL USUARIO
// PARAMETROS --> EL USUARIO AL QUE SE LE VA A MODIFICAR EL TEXTO DE SU DEUDA
// ¿QUÉ HACE LA FUNCIÓN? --> MODIFICA EL CONTENIDO DEL PARRAFO DE LA TARJETA QUE ESTÁ EN LA PESTAÑA CUENTAS POR CADA USUARIO
function modificarDeuda() {

    usuarios.forEach(usuario => {
        // PARRAFO QUE SE VA A MODIFICAR
        let parrafo = document.getElementById(`${usuario.nombre}`);
        // GASTO DEL USUARIO
        let gastoUsuario = usuario.calcularGastos();
        // RETRIBUCION DE CADA USUARIO
        let deuda = gastoUsuario - calcularRetribucion();
        
        if (deuda == 0) {
            parrafo.innerHTML = "Ha pagado " + gastoUsuario + "&euro; su cuenta está saldada."
        } else if (deuda > 0) {
            parrafo.innerHTML = "Ha pagado " + gastoUsuario + "&euro; le deben " + deuda.toFixed(2) + "&euro;."
        } else if (deuda < 0) {
            parrafo.innerHTML = "Ha pagado " + gastoUsuario + "&euro; debe pagar " + Math.abs(deuda).toFixed(2) + "&euro;."
        }
    });
}

// FUNCION GENERAR CUENTAS
// ¿QUÉ HACE LA FUNCIÓN? --> POR CADA USUARIO GENERA LA TARJETA EN LA PESTAÑA DE CUENTAS
function generarCuentas() {
    for (let i = 0; i < usuarios.length; i++) {
        crearCuenta(usuarios[i]);
    }
}

// FUNCIÓN CALCULAR TOTAL
// ¿QUÉ HACE LA FUNCIÓN? --> CALCULA EL GASTO TOTAL DE TODOS LOS USUARIOS
function calcularTotal() {
    let total = 0;
    for (let i = 0; i < usuarios.length; i++) {
        total += usuarios[i].calcularGastos();
    }
    return total;
}
// FUNCIÓN CALCULAR RETRIBUCION POR CADA USUARIO
// ¿QUÉ HACE LA FUNCIÓN? --> RECOGE EL GASTO TOTAL DE TODOS LOS USUARIOS(calcularTotal) 
//                           Y LO DIVIDE ENTRE EL NUMERO DE USUARIOS
function calcularRetribucion() {
    let total = calcularTotal();
    let contribucion = total / usuarios.length;
    return contribucion;
}

// LLAMADA A LA FUNCIÓN GENERAR CUENTAS
generarCuentas();