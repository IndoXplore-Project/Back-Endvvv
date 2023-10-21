const express = require("express");
const router = express.Router();

const destinationCategoryRouter = require("./destinationCategoryRouter");
const destinationRouter = require("./destinationRouter");
const articleRouter = require("./articleRouter");

router.use("/api/destination-categories", destinationCategoryRouter);
router.use("/api/destinations", destinationRouter);
router.use("/api/articles", articleRouter);

module.exports = router;
