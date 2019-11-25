const gameController = require("../controllers/game");

module.exports = app => {
  app.get("/jogo", gameController.index);
};
