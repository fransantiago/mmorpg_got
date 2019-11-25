const logoutController= require('../controllers/logout');

module.exports = app => {
    app.get('/sair', logoutController.store);
}