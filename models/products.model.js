const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Product', productSchema);
