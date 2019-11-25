const { validationResult } = require("express-validator");
const UserModel = require("../models/users");

module.exports = {
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.render("index", { errors: errors.array() });

    const { username, password } = req.body;
    const credentials = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (!user)
        return res.render("index", {
          errors: [{ msg: "Usuário não existe." }],
          dados: credentials
        });
      if (!(await user.compareHash(password)))
        return res.render("index", {
          errors: [{ msg: "Senha inválida." }],
          dados: credentials
        });

      req.session.authorized = true;
      req.session.username = user.username;
      req.session.house = user.house;
      req.session.userID = user._id;

      return res.redirect("/jogo");
    } catch (error) {
      console.log(error);
    }
  }
};
