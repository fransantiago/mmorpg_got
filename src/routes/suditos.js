const villagersController = require("../controllers/villagers");
const customMiddlewares = require("../middlewares/custom");

module.exports = app => {
  app.get("/suditos", villagersController.index);

  app.post(
    "/ordenar_suditos",
    customMiddlewares.validateOrderToSubjectsFields,
    villagersController.store
  );
};
