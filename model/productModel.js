const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {type: String},
    brand: {type: String},
    image: {type: String},
    price: {type: Number},
});

const product = mongoose.model("products", productSchema);
module.exports = product;