const cart_controller=require('../controllers/cart.controllers')
const auth_middleware=require('../middlewares/auth.middleware')

module.exports=(app)=>{
    app.post('/ecommApp/api/v1/cart', [auth_middleware.verifyToken], cart_controller.createCart);
    app.get('/ecommApp/api/v1/cart', [auth_middleware.verifyToken], cart_controller.fetchCart);
    app.get('/ecommApp/api/v1/cart/user_name', [auth_middleware.verifyToken], cart_controller.fetchCartByName);
    app.put('/ecommApp/api/v1/cart', [auth_middleware.verifyToken], cart_controller.updateCart);
    app.delete('/ecommApp/api/v1/cart', [auth_middleware.verifyToken], cart_controller.deleteCart);
}