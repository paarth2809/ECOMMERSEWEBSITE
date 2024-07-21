const product_controller=require('../controllers/product.controller')
const auth_middleware=require('../middlewares/auth.middleware')

module.exports = (app) => {
    app.post('/ecommApp/api/v1/products', [auth_middleware.verifyToken,auth_middleware.isAdmin], product_controller.addProduct);
    app.get('/ecommApp/api/v1/products', [auth_middleware.verifyToken], product_controller.fetchProducts);
    app.get('/ecommApp/api/v1/products/fetchByCategory', [auth_middleware.verifyToken], product_controller.fetchProductsByCategory);
    app.put('/ecommApp/api/v1/products', [auth_middleware.verifyToken,auth_middleware.isAdmin], product_controller.updateProduct);
    app.delete('/ecommApp/api/v1/products', [auth_middleware.verifyToken,auth_middleware.isAdmin], product_controller.deleteProduct);
};