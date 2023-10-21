const express = require("express");
const router = express.Router();

const {
  getDestinationByID,
  getDestinationsByRate,
  getDestinationsByCategoryAndProvince,
  getRandomDestination,
} = require("../controllers/destinationController");

router.get("/rates", getDestinationsByRate);
router.get("/search", getDestinationsByCategoryAndProvince);
router.get("/random", getRandomDestination);
router.get("/:id", getDestinationByID);

module.exports = router;
