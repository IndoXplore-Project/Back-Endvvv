const destinationModel = require("../models/destinationModel");
const mongoose = require("mongoose");

module.exports = {
  getDestinationByID: async (req, res) => {
    try {
      const destinationId = req.params.id;
      const detailDestination = await destinationModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(destinationId),
          },
        },
        {
          $lookup: {
            from: "destination_categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryData",
          },
        },
        {
          $addFields: {
            categoryName: { $arrayElemAt: ["$categoryData.name", 0] },
          },
        },
      ]);

      if (!detailDestination) {
        res.status(404).json({ message: "Destination not found" });
      }

      res.status(200).json({
        message: "Get detail destination successfully",
        data: detailDestination[0],
      });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getDestinationsByRate: async (req, res) => {
    try {
      const destinations = await destinationModel
        .find()
        .sort({ rate: -1 })
        .limit(6)
        .select("_id name province destinationImg rate");

      if (!destinations || destinations.length === 0) {
        res.status(404).json({ message: "Destination not found" });
      }

      res.status(200).json({
        message: "Get destination By Rate successfully",
        data: destinations,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getDestinationsByCategoryAndProvince: async (req, res) => {
    try {
      const { category, province } = req.query;

      const destinations = await destinationModel.aggregate([
        {
          $lookup: {
            from: "destination_categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryData",
          },
        },
        {
          $match: {
            "categoryData.name": category,
            province: province,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            province: 1,
            destinationImg: 1,
            rate: 1,
          },
        },
      ]);

      if (!destinations || destinations.length === 0) {
        return res.status(404).json({ message: "Destinations not found" });
      }

      res.status(200).json({
        message: "Get destinations successfully",
        totalDestinations: destinations.length,
        data: destinations,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getRandomDestination: async (req, res) => {
    try {
      const randomDestination = await destinationModel.aggregate([
        { $sample: { size: 1 } },
        {
          $lookup: {
            from: "destination_categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryData",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            province: 1,
            address: 1,
            gallery: { $arrayElemAt: ["$gallery", 0] },
            operationalTime: 1,
            rate: 1,
            categoryName: { $arrayElemAt: ["$categoryData.name", 0] },
          },
        },
      ]);

      if (!randomDestination || randomDestination.length === 0) {
        res.status(404).json({ message: "Destination not found" });
      }

      res.status(200).json({
        message: "Get random destination successfully",
        data: randomDestination[0],
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
