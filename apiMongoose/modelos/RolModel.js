const mongoose = require("mongoose");

const { Schema } = mongoose;

const RolModel = Schema({
  nombre: { type: String },
  description: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Rol", RolModel);