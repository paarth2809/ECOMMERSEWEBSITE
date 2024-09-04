 const category_controller = require('../controllers/category.controller');
const auth_middleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.post('/ecommApp/api/v1/categories', [auth_middleware.verifyToken,auth_middleware.isAdmin], category_controller.createCategory);
    app.get('/ecommApp/api/v1/categories', [auth_middleware.verifyToken], category_controller.fetchCategory);
    app.get('/ecommApp/api/v1/categories/name', [auth_middleware.verifyToken], category_controller.fetchCategoryByName);
    app.put('/ecommApp/api/v1/categories', [auth_middleware.verifyToken,auth_middleware.isAdmin], category_controller.updateCategory);
    app.delete('/ecommApp/api/v1/categories', [auth_middleware.verifyToken,auth_middleware.isAdmin], category_controller.deleteCategory);
};
