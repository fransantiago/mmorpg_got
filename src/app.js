require("dotenv").config();

const expressSession = require("express-session");
const mongoose = require("mongoose");
const consign = require("consign");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const SESSIONOPTIONS = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
};

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(expressSession(SESSIONOPTIONS));

mongoose.connect("mongodb://localhost:27016/got", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

consign()
  .include("src/routes")
  .into(app);

app.listen(PORT);
