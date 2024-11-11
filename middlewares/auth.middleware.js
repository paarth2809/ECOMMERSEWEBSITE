const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth_config = require('../configs/auth.config');

const verifySignUpBody = async (req, res, next) => {
    try {
        // check for name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name not provided in request body"
            });
        }

        // check for email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Email not provided in request body"
            });
        }

        // check for user id
        if (!req.body.userId) {
            return res.status(400).send({
                message: "UserId not provided in request body"
            });
        }

    // check if user id already present or not
        const user = await user_model.findOne({ userId: req.body.userId });
        if (user) {
            return res.status(400).send({
                message: "User with same UserId already present"
            });
        }

        next();
    } catch (err) {
        console.error("Error while validating request body", err);
        res.status(500).send({
            message: "Error while validating request body"
        });
    }
};

const verifySignInBody = async (req, res, next) => {
    try {
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Userid not provided in request body"
            });
        }

        if (!req.body.password) {
            return res.status(400).send({
                message: "Password not provided in request body"
            });
        }

        next();
    } catch (err) {
        console.error("Error while validating request body", err);
        res.status(500).send({
            message: "Error while validating request body"
        });
    }
};

const verifyToken = (req, res, next) => {
    // check if token present in the header
    const token = req.headers['x-access-token'];

    // if token not present in headers
    if (!token) {
        return res.status(403).send({
            message: "No token found: Unauthorized"
        });
    }

    // check if its valid token
    jwt.verify(token, auth_config.secretMessage, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        const user = await user_model.findOne({ userId: decoded.id });
        if (!user) {
            return res.status(400).send({
                message: "Unauthorized, the user for this token doesn't exist"
            });
        }

        req.user=user // written for isAdmin function

        next();
    });
};

const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN")
        next();
    else{
        return res.status(403).send({
            message: "only admin user allowed to access this endpoint"
        })
    }
    next()
}

const isValidUser=(req,res,next)=>{
    const user=req.user
    // user.name is the name assigned while generating token 
    if(user && user.name==req.body.user_name)
        next();
    else{
        return res.status(403).send({
            message: "user with provided name don't exist"
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isValidUser: isValidUser
};
