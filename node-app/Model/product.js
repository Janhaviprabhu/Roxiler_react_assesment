const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;