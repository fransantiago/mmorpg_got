const { Schema, model } = require("mongoose");

const ActionsSchema = new Schema(
  {
    action: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    endsIn: {
      type: Date,
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

module.exports = model("Acoes", ActionsSchema);
