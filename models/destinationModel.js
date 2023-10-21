const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "destination_categories",
  },
  province: String,
  address: String,
  geoLocation: {
    lat: Number,
    long: Number,
  },
  destinationImg: String,
  description: String,
  activities: Array,
  facilitiesAndServices: Array,
  operationalTime: String,
  weatherCharacteristics: String,
  transportation: Array,
  bestTimeToVisit: String,
  localTipsAndAdvice: Array,
  gallery: Array,
  ticket: Array,
  contactInformation: String,
  rate: Number,
});

module.exports = mongoose.model("Destination", destinationSchema);
