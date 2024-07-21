const product_model = require('../models/products.model');
const category_model = require('../models/category.model');

// Create product
exports.addProduct = async (req, res) => {
    const product_obj = req.body;

    try {
        const product = await product_model.create(product_obj);
        return res.status(201).send(product);
    } catch (err) {
        console.error("Error while creating product:", err);
        res.status(500).send({
            message: "Error while creating product"
        });
    }
};

// Fetch all products
exports.fetchProducts = async (req, res) => {
    try {
        const product_obj = await product_model.find();
        res.status(200).send(product_obj);
    } catch (err) {
        console.error("Error while fetching products:", err);
        res.status(500).send({
            message: "Error while fetching products"
        });
    }
};

// Fetch product by category
exports.fetchProductsByCategory = async (req, res) => {
    try {
        const category_name = req.query.category;
        if (!category_name) {
            return res.status(400).send({
                message: "Category name not provided"
            });
        }
        const product_obj = await product_model.find({ category: category_name });
        if (product_obj && product_obj.length > 0) {
            res.status(200).send(product_obj);
        } else {
            res.status(404).send({
                message: "Products with provided category not present"
            });
        }
    } catch (err) {
        console.error("Error while fetching products:", err);
        res.status(500).send({
            message: "Error while fetching products"
        });
    }
};

// Delete product by name
exports.deleteProduct = async (req, res) => {
    try {
        const product_name = req.query.name;
        const result = await product_model.deleteOne({ name: product_name });
        if (result.deletedCount) {
            res.status(200).send({ message: "Product deleted successfully" });
        } else {
            res.status(404).send({ message: "Product with given name not present" });
        }
    } catch (err) {
        console.error("Error while deleting product:", err);
        res.status(500).send({
            message: "Error while deleting product"
        });
    }
};

// Update product by name
exports.updateProduct = async (req, res) => {
    try {
        const product_name = req.body.productName;
        const req_obj = req.body;

        const product = await product_model.findOne({ name: product_name });

        if (!product) {
            return res.status(404).send({
                message: "Product with provided name not present"
            });
        }

        // for (const key in req_obj) {
        //     if (req_obj.hasOwnProperty(key) && key !== "productName") {
        //         product[key] = req_obj[key];
        //     }
        // }

        for(keys in req_obj){
            if(keys!="productName") product[keys]=req_obj[keys]
        }

        await product.save();
        res.status(200).send(product);
    } catch (err) {
        console.error("Error while updating product:", err);
        res.status(500).send({
            message: "Error while updating product"
        });
    }
};
