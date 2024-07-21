const auth_controller = require('../controllers/auth.controller');
const auth_middleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.post('/ecommApp/api/v1/auth/signup', [auth_middleware.verifySignUpBody], auth_controller.signup);
    app.post('/ecommApp/api/v1/auth/signin', [auth_middleware.verifySignInBody], auth_controller.signin);
};
