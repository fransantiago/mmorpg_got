const GameModel = require("../models/games");

module.exports = {
  async index(req, res) {
    if (!req.session.authorized)
      return res.render("index", {
        errors: [{ msg: "É necessário fazer login." }]
      });

    const { event } = req.query;

    const userHouseAttrs = await GameModel.find({ user: req.session.userID });

    res.render("game", {
      house: req.session.house,
      attrs: userHouseAttrs[0],
      event
    });
  }
};
