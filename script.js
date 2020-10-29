$(function() {
    
   //GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/pedido/products',
            contentType: 'aplication/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                
                tbodyEl.html('');
                
                response.products.forEach(function(product){
                    var sub = product.price * product.cantidad;
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td><input type="text" class="price" id="product" value="' + product.price + '"></td>\
                            <td><input type="text" class="cantidad" id="cantidad"value="' + product.cantidad + '"></td>\
                            <td name="subtotal">' +sub+ '</td>\
                        <td>\
                            <button class="update-button btn btn-success">Actualizar</button>\
                            <button class="delete-button btn btn-danger">Eliminar</button>\
                        </td>\
                    </tr>\
                    ');
                    
                });
                calcular_total();
            }
            
        });
    });
    function calcular_total(){
    
    var subtotales = document.getElementsByName('subtotal');
    var total = document.getElementById('total');
    
    var suma = 0;
    
    for (var i=0; i < subtotales.length; i++){
        suma = suma + Number(subtotales[i].innerText);
    }
    
    total.innerText = "$ "+suma;
     
    }
    
    
    //CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');
        var createInput_ = $('#create-input_');
        var createInput__ = $('#create-input__');

        $.ajax({
            url: '/pedido/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val(), price: createInput_.val(),cantidad: createInput__.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                createInput_.val('');
                createInput__.val('');
                $('#get-button').click();
            }
        });
    });
   // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newPrice = rowEl.find('.price').val();

        $.ajax({
            url: '/pedido/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newPrice: newPrice }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/pedido/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});