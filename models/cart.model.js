const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    products:{
        type: Array
    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
