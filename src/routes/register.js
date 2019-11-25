const registerController = require("../controllers/register");
const customMiddlewares = require("../middlewares/custom");

module.exports = app => {
  app.get("/cadastro", registerController.index);
  app.post(
    "/cadastrar",
    customMiddlewares.validateSignUpFields,
    registerController.store
  );
};
