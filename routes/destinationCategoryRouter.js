const express = require("express");
const router = express.Router();

const {
  getAllDestinationCategories,
  getDestinationCategoryByID,
} = require("../controllers/destinationCategoryController");

router.get("/", getAllDestinationCategories);
router.get("/:id", getDestinationCategoryByID);

module.exports = router;
