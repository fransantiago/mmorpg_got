const { validationResult } = require("express-validator");
const UserModel = require("../models/users");
const GameModel = require("../models/games");
const GameData = require("../data/houses.json");

module.exports = {
  index(req, res) {
    res.render("register", { errors: [], dados: {} });
  },

  async store(req, res) {
    const data = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.render("register", { errors: errors.array(), dados });

    try {
      const userExists = await UserModel.find({ username: data.username });
      if (userExists.length)
        return res.render("register", {
          errors: [{ msg: "Usuário já existe" }],
          dados: data
        });

      const user = await UserModel.create(data);
      const houseAttrsInit = GameData[user.house];

      houseAttrsInit.user = user._id;
      await GameModel.create(houseAttrsInit);

      res.render("index", { errors: [] });
    } catch (error) {
      console.log(error);
    }
  }
};
