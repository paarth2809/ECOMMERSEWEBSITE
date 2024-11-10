const category_model = require('../models/category.model');

// Create category
exports.createCategory = async (req, res) => {
    // read the req body
    // create category object
    // insert into mongoDB
    // return the response of created category
    
    const category_obj = req.body;

    try {
        const category = await category_model.create(category_obj);
        return res.status(201).send(category);
    } catch (err) {
        console.error("Error while creating category:", err);
        res.status(500).send({
            message: "Error while creating category"
        });
    }
};

// Fetch all categories
exports.fetchCategory = async (req, res) => {
    try {
        const category_obj = await category_model.find();
        res.status(200).send(category_obj);
    } catch (err) {
        console.error("Error while fetching categories:", err);
        res.status(500).send({
            message: "Error while fetching categories"
        });
    }
};

// Fetch category by name
exports.fetchCategoryByName = async (req, res) => {
    try {
        const category_name = req.query.name;
        if (!category_name) {
            return res.status(400).send({
                message: "Category name not provided"
            });
        }
        const category_obj = await category_model.findOne({ name: category_name });
        if (category_obj) {
            res.status(200).send(category_obj);
        } else {
            res.status(404).send({
                message: "Category with provided name not present"
            });
        }
    } catch (err) {
        console.error("Error while fetching category:", err);
        res.status(500).send({
            message: "Error while fetching category"
        });
    }
};



// Delete category by name
exports.deleteCategory = async (req, res) => {
    try {
        const category_name = req.query.name;
        const result = await category_model.deleteOne({ name: category_name });
        if (result.deletedCount) {
            res.status(200).send({ message: "Category deleted successfully" });
        } else {
            res.status(404).send({ message: "Category with given name not present" });
        }
    } catch (err) {
        console.error("Error while deleting category:", err);
        res.status(500).send({
            message: "Error while deleting category"
        });
    }
};

// Update category by name
exports.updateCategory = async (req, res) => {
    try {
        const category_name = req.query.name;
        const req_obj = req.body;
        const category_obj = await category_model.findOneAndUpdate(
            { name: category_name },
            req_obj,
            { new: true, runValidators: true }
        );
        if (category_obj) {
            res.status(200).send(category_obj);
        } else {
            res.status(404).send({
                message: "Category with provided name not present"
            });
        }
    } catch (err) {
        console.error("Error while updating category:", err);
        res.status(500).send({
            message: "Error while updating category"
        });
    }
};
