const express = require('express');
const productRouter = express.Router();
const product = require('../model/productModel');



productRouter.get('/', (req, res) => {
    product.find({}, (err, data) => {
        try {
            res.send(data);
        } catch (err) {
            res.send(err)
        }
    })
});

productRouter.get('/:id', (req,res)=>{
    product.findById(req.params.id, (err,data)=>{
        if(err){
            res.json(err)
        } else{
            res.json(data);
        }
    })
});


productRouter.post('/', function (req, res) {
    var mod = new product(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: 'PRODUCT ADDED' });
        }
    });

});




module.exports = productRouter;
