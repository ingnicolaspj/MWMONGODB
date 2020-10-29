function agregar_producto(){
    
    var producto = document.getElementById("form_producto");
    var precio = document.getElementById("precio");
    var cantidad = document.getElementById("cantidad");
    
    var datos = document.getElementById("tabla_productos");
   
    var subtotal = Number(precio.value) * Number(cantidad.value); 
    
    datos.innerHTML = datos.innerHTML + "<tr>"+
                                            "<td>"+producto.value+"</td>"+
                                            "<td>"+precio.value+"</td>"+
                                            "<td>"+cantidad.value+"</td>"+
                                            "<td name='subtotal'>"+subtotal+"</td>"+
                                        "</tr>";
    
    calcular_total();
    
}

function calcular_total(){
    
    var subtotales = document.getElementsByName('subtotal');
    var total = document.getElementById('total');
    
    var suma = 0;
    
    for (var i=0; i < subtotales.length; i++){
        suma = suma + Number(subtotales[i].innerText);
    }
    
    total.innerText = "$"+suma;
     
}