const ActionModel = require("../models/actions");
const {
  Types: { ObjectId }
} = require("mongoose");

module.exports = {
  async index(req, res) {
    if (!req.session.authorized)
      return res.render("index", {
        errors: [{ msg: "É necessário fazer login." }]
      });

    const acoes = await ActionModel.find({
      user: req.session.userID,
      endsIn: {
        $gt: Date.now()
      }
    });
    res.render("parchments", { acoes });
  },

  async delete(req, res) {
    const { id } = req.params;

    await ActionModel.deleteOne({ _id: ObjectId(id) });
    return res.json({ success: true });
  }
};
