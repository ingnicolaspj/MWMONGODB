function capturar(){
//    console.log("capturado");
    function Producto(nombre,precio,descripcion){
        this.nombre=nombre; 
        this.precio=precio;
        this.descripcion=descripcion;
    }
    var nombreCapturar = document.getElementById("nombre").value;
    var precioCapturar = document.getElementById("precio").value;
    var descripcionCapturar = document.getElementById("descripcion").value;
    
    nuevoProducto =  new Producto(nombreCapturar,precioCapturar,descripcionCapturar);
    console.log(nuevoProducto);
    agregar();
}
    var baseDatos = [];
    function agregar(){
        baseDatos.push(nuevoProducto);
        console.log(baseDatos);
        document.getElementById("tabla").innerHTML += '<tbody><td>'+nuevoProducto.nombre+'</td><td>'+nuevoProducto.precio+'</td><td>'+nuevoProducto.descripcion+'</td></tbody>';
    };