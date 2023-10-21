const mongoose = require("mongoose");

const destinationCategoriesSchema = new mongoose.Schema({
  name: String,
  description: String,
  categoryImg: Array,
});

module.exports = mongoose.model(
  "Destination_Categories",
  destinationCategoriesSchema
);
