const authenticationController = require("../controllers/authentication");
const customMiddlewares = require("../middlewares/custom");

module.exports = app => {
  app.post(
    "/autenticar",
    customMiddlewares.validateSignInFields,
    authenticationController.store
  );
};
