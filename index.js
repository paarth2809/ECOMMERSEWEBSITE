const express = require('express');
const mongoose = require('mongoose');
const server_config = require('./configs/index.config');
const db_config = require('./configs/db.config');
const user_model = require('./models/user.model');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

require('./routes/auth.route')(app);
require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/cart.route')(app);

app.listen(server_config.PORT, () => {
    console.log("Server has started on port number:", server_config.PORT);
});

mongoose.connect(db_config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", () => {
    console.log("MongoDB connection success");
    init();
});

db.on("error", (err) => {
    console.error("MongoDB connection failed:", err);
});

async function init() {
    let user = await user_model.findOne({ userId: "admin" });

    try {
        if (user) {
            console.log("Admin already present");
            return;
        }
    } catch (err) {
        console.error("Error while reading data:", err);
    }

    try {
        user = await user_model.create({
            name: "paarth",
            userId: "admin",
            email: "paarthmonga28@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("qwer4321", 8)
        });
        console.log("Admin created", user);
    } catch (err) {
        console.error("Error while creating admin:", err);
    }
}