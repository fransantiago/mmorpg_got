const { validationResult } = require("express-validator");
const ActionModel = require("../models/actions");
const GameModel = require("../models/games");

module.exports = {
  index(req, res) {
    if (!req.session.authorized)
      return res.render("index", {
        errors: [{ msg: "É necessário fazer login." }]
      });
    res.render("villagers");
  },

  async store(req, res) {
    let actionEndsIn = null;
    let spentCoins = null;
    const data = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty() || parseInt(data.quantity) < 1)
      return res.redirect("/jogo?event=danger");

    switch (parseInt(data.action)) {
      case 1:
        actionEndsIn = 1 * 60 * 60 * 1000;
        spentCoins = -2 * data.quantity;
        break;
      case 2:
        actionEndsIn = 2 * 60 * 60 * 1000;
        spentCoins = -3 * data.quantity;
        break;
      case 3:
      case 4:
        actionEndsIn = 5 * 60 * 60 * 1000;
        spentCoins = -1 * data.quantity;
        break;
      default:
        actionEndsIn = 0;
        spentCoins = 0;
    }

    data.endsIn = new Date(Date.now() + actionEndsIn);
    data.user = req.session.userID;
    await ActionModel.create(data);

    await GameModel.updateOne(
      { user: req.session.userID },
      { $inc: { coins: spentCoins } }
    );

    return res.redirect("/jogo?event=success");
  }
};
