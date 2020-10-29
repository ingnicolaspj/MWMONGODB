require('dotenv').config();

require('./database');

const Pedido = require('./models/Pedido');
 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var products = [
    {
        id: 1,
        name: 'Xbox One X',
        price: 8000,
        cantidad: 1,
    },
    {
        id: 2,
        name: 'PS4',
        price: 7000,
        cantidad:2,
    }
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/pedido/products', function(req, res) {
    res.send({ products: products });
});

app.post('/pedido/products', function(req, res) {
    
    var productName = req.body.name;
    var productPrice = req.body.price;
    var productCantidad = req.body.cantidad;
    currentId++;

    products.push({
        id: currentId,
        name: productName,
        price: productPrice,
        cantidad: productCantidad,
    });
    
   console.log('POST /pedido/products');
   console.log(req.body);
    
   let pedido =  new Pedido();
   pedido.name = req.body.name;
   pedido.price = req.body.price;
   pedido.cantidad = req.body.cantidad;
    
   pedido.save((err, pedidoStored) => {
    if (err) res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
    
    res.status(200).send({pedido: pedidoStored})
   });
    
   
});

//app.post('/products', function(req, res) {
//    var productName = req.body.name;
//    var productPrice = req.body.price;
//    var productCantidad = req.body.cantidad;
//    currentId++;
//
//    products.push({
//        id: currentId,
//        name: productName,
//        price: productPrice,
//        cantidad: productCantidad,
//    });
//
//    res.send('Successfully created product!');
//});

app.put('/pedido/products/:id', function(req, res) {
    var id = req.params.id;
    var newPrice = req.body.newPrice;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.price = newPrice;
        }
    });

    res.send('Succesfully updated product!');
});

app.delete('/pedido/products/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});