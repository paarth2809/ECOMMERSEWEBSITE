const cart_model = require('../models/cart.model');

// Create cart
exports.createCart = async (req, res) => {
    const cart_obj = req.body;

    try {
        const cart = await cart_model.create(cart_obj);
        return res.status(201).send(cart);
    } catch (err) {
        console.error("Error while creating cart:", err);
        res.status(500).send({
            message: "Error while creating cart"
        });
    }
};

// Fetch all carts
exports.fetchCart = async (req, res) => {
    try {
        const cart_obj = await cart_model.find();
        res.status(200).send(cart_obj);
    } catch (err) {
        console.error("Error while fetching carts:", err);
        res.status(500).send({
            message: "Error while fetching carts"
        });
    }
};

// Fetch cart by user name
exports.fetchCartByName = async (req, res) => {
    try {
        const user = req.query.userName;
        if (!user) {
            return res.status(400).send({
                message: "User name not provided"
            });
        }
        const user_obj = await cart_model.find({ user_name: user });
        if (user_obj && user_obj.length > 0) {
            res.status(200).send(user_obj);
        } else {
            res.status(404).send({
                message: "Cart with provided user name not present"
            });
        }
    } catch (err) {
        console.error("Error while fetching carts:", err);
        res.status(500).send({
            message: "Error while fetching carts"
        });
    }
};

// Delete cart by user name
exports.deleteCart = async (req, res) => {
    try {
        const user = req.query.userName;
        const result = await cart_model.deleteOne({ user_name: user });
        if (result.deletedCount) {
            res.status(200).send({ message: "Cart deleted successfully" });
        } else {
            res.status(404).send({ message: "Cart with given user name not present" });
        }
    } catch (err) {
        console.error("Error while deleting cart:", err);
        res.status(500).send({
            message: "Error while deleting cart"
        });
    }
};

// Update cart by user name
exports.updateCart = async (req, res) => {
    try {
        const user = req.body.userName;
        const req_obj = req.body;

        const cart = await cart_model.findOne({ user_name: user });

        if (!cart) {
            return res.status(404).send({
                message: "Cart with provided user name not present"
            });
        }

        for (const key in req_obj) {
            if (req_obj.hasOwnProperty(key) && key !== "userName") {
                cart[key] = req_obj[key];
            }
        }

        await cart.save();
        res.status(200).send(cart);
    } catch (err) {
        console.error("Error while updating cart:", err);
        res.status(500).send({
            message: "Error while updating cart"
        });
    }
};


exports.addProductToCart = async (req, res) => {
    try {
        const user = req.body.user_name;
        const product = req.body.products;

        const cart = await cart_model.findOne({ user_name: user });

        if (!cart) {
            return res.status(404).send({
                message: "Cart with provided user name not present"
            });
        }

        for(i=0;i<product.length;i++){
            cart['products'].push(product[i])
        }

        await cart.save();
        res.status(200).send({
            message: 'items successfully added to cart',
            cart: cart
        });
    } catch (err) {
        console.error("Error while adding items to cart:", err);
        res.status(500).send({
            message: "Error while adding items to  cart"
        });
    }
};
