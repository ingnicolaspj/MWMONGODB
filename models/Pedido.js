'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    name: String, 
    price:{
        type:Number,
        default: 0
    }, 
    cantidad:{
       type: Number,
       default: 0
    }
    
});

module.exports = mongoose.model('Pedido', PedidoSchema);