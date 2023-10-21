const express = require("express");
const router = express.Router();

const {
  getAllArticles,
  getLatestArticles,
  getArticleByID,
} = require("../controllers/articleController");

router.get("/", getAllArticles);
router.get("/latest", getLatestArticles);
router.get("/:id", getArticleByID);

module.exports = router;
