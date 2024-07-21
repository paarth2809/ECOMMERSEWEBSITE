const user_model = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_message = require('../configs/auth.config');

exports.signup = async (req, res) => {
    const req_body = req.body;

    const userObj = {
        name: req_body.name,
        userId: req_body.userId,
        email: req_body.email,
        userType: req_body.userType,
        password: bcrypt.hashSync(req_body.password, 8)
    };
    try {
        const user = await user_model.create(userObj);

        const resObj = {
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(201).send({
            message: "User registered successfully",
            user: resObj
        });
    } catch (err) {
        console.error("Error while creating user:", err);
        res.status(500).send({
            message: "Error while registering user"
        });
    }
};

exports.signin = async (req, res) => {
    const user = await user_model.findOne({ userId: req.body.userId });

    if (!user) {
        return res.status(400).send({
            message: "User ID passed is not a valid user ID"
        });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Wrong password passed"
        });
    }

    const token = jwt.sign({ id: user.userId }, secret_message.secretMessage, {
        expiresIn: 12000 // seconds
    });

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    });
};
