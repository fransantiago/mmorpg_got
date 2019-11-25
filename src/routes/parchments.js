const parchmentsController = require("../controllers/parchments");

module.exports = app => {
  app.get("/pergaminhos", parchmentsController.index);
  app.delete("/pergaminhos/acoes/:id", parchmentsController.delete);
};
