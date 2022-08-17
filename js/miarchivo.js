//Funcion menu de opciones Principal
const menuPrincipal = () => Number(prompt("Ingrese la opcion que desea realizar: \n1 - Ver productos disponibles y realizar una compra. \n2 - Modificacion de stock (Administradores).\n0 - Salir de la tienda"))

//Funcion verificacion opcion Menu Principal
function checkPrincipal(valor){
while(valor !=1 && valor !=2 && valor !=0){
    alert("La opcion no existe. Ingrese una opcion existente: ");
    valor = menuPrincipal()
} return valor
}

//Funcion para mostrar descripciones en prompt
function descripcionesProd(lista){
    let descripMenu = []
    for (let elemento of lista){
        descripMenu.push(elemento.descripProd());
    }
    let muestra = descripMenu.join("\n");
    return muestra;
};

//Funcion menu de opciones productos y formas de pago
function menuProd(dato){
    let elegirOp = prompt(dato);
    return elegirOp
};

//Funcion verificacion codigo Producto
function checkProd(valor, maximo){
while(valor < 1 || valor > maximo){
  alert("El codigo ingresado es invalido. Ingrese un codigo existente: ");
  valor = menuProd(descripcionesProd(listaProductos));
} return valor
}

//Funcion verificacion codigo Forma de Pago (Queda pendiente que el while sea variable, lo toque y exploto todo)
function checkPago(valor){
while(valor !=1 && valor !=3 && valor !=6 && valor !=12){
    alert("El numero de cuotas es invalido. Ingrese una cantidad existente: ");
    valor = menuProd(descripcionesProd(listaFromasDePago));
} return valor
}

//Constructor de Objeto Producto
class Producto{
    constructor(id, tipo, marca, modelo, precio){
        this.id = id;
        this.tipo = tipo.toUpperCase();
        this.marca = marca.toUpperCase();
        this.modelo = modelo.toUpperCase();
        this.precio = Number(precio)
    }
    descripProd(){return this.id+". "+this.tipo+". "+this.marca+". "+this.modelo+". "+"$" + this.precio};
}

//Se crean algunos productos para mostrar en lista inicial y se pushean dentro del array de productos
const prod1 = new Producto(1, "televisor", "philips", 'gf 43"', 85400);
const prod2 = new Producto(2, "celular", "samsung", 'A32', 52300);
const prod3 = new Producto(3, "tablet", "alcatel", 'M 10"', 38000)
const listaProductos = [];
listaProductos.push(prod1, prod2,prod3);

//Constructor de Objeto Formas de Pago.
class FormasPago{
    constructor(cant, descripcion, interes){
        this.cant = Number(cant);
        this.descripcion = descripcion.toLowerCase();
        this.interes = Number(interes)
    }
    descripProd(){return this.cant+" "+this.descripcion+" "+this.interes+"%"};
}

//Se crean algunas forma de pago y se pushean a la lista.
const pago1 = new FormasPago(1, "pago con descuento de", -10);
const pago2 = new FormasPago(3, "cuotas con interes de", 20);
const pago3 = new FormasPago(6, "cuotas con interes de", 35);
const pago4 = new FormasPago(12, "cuotas con interes de", 50);
const listaFromasDePago = [];
listaFromasDePago.push(pago1, pago2, pago3, pago4);

//Bienvenida y Menu de Opciones Principal
alert("BIENVENIDO A NUESTRO HOT SALE !!!\nVEA NUESTRAS OFERTAS !!!");

let opcionPrincipal = checkPrincipal(menuPrincipal());

while(opcionPrincipal != 0){
    if (opcionPrincipal === 1){

        //Compra de los Productos. Genera un nuevo array (compraParcial) con el  Id de los productos comprados.
        let compraProd;
        let masProd;
        const compraParcial = [];
        do{
            compraProd = checkProd(menuProd(descripcionesProd(listaProductos)), listaProductos.length);
            compraParcial.push(compraProd);
            masProd = prompt("Desea continuar comprando? Si / No: ").toLowerCase();
        }while(masProd == "si");

        //Utilizando el array con Id de productos comprados, generamos uno nuevo con todas las propiedades de los mismos.
        const compraFinal = [];
        for (const idCompra of compraParcial) {
            comProCompleto = listaProductos.find((el) => el.id == idCompra)
            compraFinal.push(comProCompleto)
        };
        alert("DETALLE DE LA COMPRA \n" + descripcionesProd(compraFinal))

        //Calcula el monto final de la compra
        let saldoAnterior = 0;
        const precioTotal = compraFinal.reduce((acc, elemento) => acc + elemento.precio, saldoAnterior);
        alert("EL MONTO TOTAL DE LA COMPRA ES: \n$" + precioTotal)

        // //Elegir forma de Pago y mostrar comprobante final
        let cantCuotas = checkPago(menuProd(descripcionesProd(listaFromasDePago)));
        const cuotaElegida = listaFromasDePago.find((el) => el.cant == cantCuotas)
        let precioFinal = (precioTotal * ((cuotaElegida.interes / 100) + 1) / cuotaElegida.cant).toFixed(2);
        alert("COMPROBANTE \nSu importe final es de " + cantCuotas +" pagos de " + "$"+ precioFinal)

        alert("MUCHAS GRACIAS POR SU COMPRA !!!")
        //Una vez realizada la compra no se le permite seguir comprando ni cargar productos.
        break
    } 
    // Opcion para agregar productos al stock.
     else if (opcionPrincipal === 2) {
        let cargarProd
        do{
            let tipo = prompt("Ingresa el tipo de producto")
            let marca = prompt("Ingresa la marca del producto")
            let modelo = prompt("Ingresa el modelo del producto")
            let precio = prompt("Ingresa el precio del producto")
            let id = listaProductos.length + 1;
            listaProductos.push(new Producto(id, tipo, marca, modelo, precio));
            cargarProd = prompt("Desea cargar otro producto? Si/No ").toLowerCase();
        } while(cargarProd === "si");

        alert("NUEVO STOCK DE LA TIENDA \n" + descripcionesProd(listaProductos));
    } 
    //Despues de la carga se le vuelve a mostrar el menu de opciones principal
    opcionPrincipal = checkPrincipal(menuPrincipal());
};

alert("MUCHAS GRACIAS POR SU VISITA!!\nLO ESPERAMOS PRONTO!!")