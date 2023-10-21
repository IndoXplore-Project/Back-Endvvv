const articleModel = require("./../models/articleModel");

module.exports = {
  getAllArticles: async (req, res) => {
    try {
      const articles = await articleModel.find(
        {},
        { _id: 1, title: 1, articleImg: 1 }
      );

      if (!articles) {
        res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({
        message: "Get all article successfully",
        data: articles,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getLatestArticles: async (req, res) => {
    try {
      const latestArticle = await articleModel
        .find(
          {},
          {
            title: 1,
            content: 1,
            publicationDate: 1,
            tag: 1,
            articleImg: 1,
          }
        )
        .sort({ publicationDate: -1 })
        .limit(2);

      if (!latestArticle) {
        res.status(404).json({ message: "Latest article not found" });
      }

      res.status(200).json({
        message: "Get latest article successfully",
        data: latestArticle,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getArticleByID: async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await articleModel.find({ _id: articleId });

      if (!article) {
        res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({
        message: "Get article by id successfully",
        data: article,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
