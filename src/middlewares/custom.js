const { check } = require("express-validator");

module.exports = {
  validateSignUpFields: [
    check("name", "Nome não pode ser vazio.")
      .not()
      .isEmpty()
      .escape(),
    check("username", "Usuário não pode ser vazio.")
      .not()
      .isEmpty()
      .escape(),
    check("password", "Senha não pode ser vazia.")
      .not()
      .isEmpty()
      .escape(),
    check("house", "Casa não pode ser vazia.")
      .not()
      .isEmpty()
      .escape()
  ],

  validateSignInFields: [
    check("username", "Usuário não pode ser vazio.")
      .not()
      .isEmpty()
      .escape(),
    check("password", "Senha não pode ser vazia.")
      .not()
      .isEmpty()
      .escape()
  ],

  validateOrderToSubjectsFields: [
    check("action", "Ação deve ser informada.")
      .not()
      .isEmpty()
      .escape(),
    check("quantity", "Quantidade deve ser informada.")
      .not()
      .isEmpty()
      .escape(),
    check("action", "Ação deve ser um número inteiro.").isInt(),
    check("quantity", "Quantidade deve ser um número inteiro.").isInt()
  ]
};
