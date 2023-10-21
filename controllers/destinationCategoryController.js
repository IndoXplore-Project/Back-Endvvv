const destinationCategoryModel = require("../models/destinationCategoryModel");
const mongoose = require("mongoose");

module.exports = {
  getAllDestinationCategories: async (req, res) => {
    try {
      const destinationCategories = await destinationCategoryModel.aggregate([
        {
          $lookup: {
            from: "destinations",
            localField: "_id",
            foreignField: "category",
            as: "destinations",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            categoryImg: { $arrayElemAt: ["$categoryImg", 0] },
            totalDestinations: { $size: "$destinations" },
          },
        },
      ]);

      if (!destinationCategories) {
        res.status(404).json({ message: "Destination category not found" });
      }

      res.status(200).json({
        message: "Get all destination categories successfully",
        data: destinationCategories,
      });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getDestinationCategoryByID: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const detailDestinationCategory =
        await destinationCategoryModel.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId.createFromHexString(categoryId),
            },
          },
          {
            $lookup: {
              from: "destinations",
              localField: "_id",
              foreignField: "category",
              as: "destinations",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
              categoryImg: { $arrayElemAt: ["$categoryImg", 1] },
              "destinations._id": 1,
              "destinations.name": 1,
              "destinations.province": 1,
              "destinations.destinationImg": 1,
              "destinations.rate": 1,
            },
          },
        ]);

      if (!detailDestinationCategory) {
        res.status(404).json({ message: "Destination category not found" });
      }

      res.status(200).json({
        message: "Get detail destination category successfully",
        data: detailDestinationCategory[0],
      });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
