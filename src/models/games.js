const { Schema, model } = require("mongoose");

const GamesSchema = new Schema(
  {
    coins: {
      type: Number,
      default: 15
    },
    subjects: {
      type: Number,
      default: 10
    },
    fear: {
      type: Number,
      required: true
    },
    wisdom: {
      type: Number,
      required: true
    },
    trade: {
      type: Number,
      required: true
    },
    magic: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Jogos", GamesSchema);
