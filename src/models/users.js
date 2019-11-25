const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    house: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UsersSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

UsersSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  }
};

module.exports = model("Usuarios", UsersSchema);
