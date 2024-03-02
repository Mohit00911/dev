const { connect } = require("mongoose");
const Tour = require("../models/tour");
const crypto = require("crypto");
const createTour = async (req, res) => {
  try {
    const {
      vendor,
      vendorName,
      uuid,
      name,
      location,
      cost,
      duration,
      cancellationPolicy,
      languages,
      highlights,
      whatsIncluded,
      whatsExcluded,
      availableDates,
      departureDetails,
      inclusions,
      exclusions,
      knowBeforeYouGo,
      additionalInfo,
    } = req.body;

    const existingTour = await Tour.findOne({ uuid: uuid });

    if (existingTour) {
      existingTour.vendorName = vendorName;
      existingTour.vendor = vendor;
      existingTour.name = name;
      existingTour.location = location;
      existingTour.cost = cost;
      existingTour.duration = duration;
      existingTour.cancellationPolicy = cancellationPolicy;
      existingTour.languages = languages;
      existingTour.highlights = highlights;
      existingTour.whatsIncluded = whatsIncluded;
      existingTour.whatsExcluded = whatsExcluded;
      existingTour.availableDates = availableDates;
      existingTour.departureDetails = departureDetails;
      existingTour.inclusions = inclusions;
      existingTour.exclusions = exclusions;
      existingTour.knowBeforeYouGo = knowBeforeYouGo;
      existingTour.additionalInfo = additionalInfo;
      const updatedTour = await existingTour.save();
      res
        .status(200)
        .json({ message: "Tour updated successfully", tour: updatedTour });
    } else {
      const newTour = new Tour({
        vendorName,
        vendor,
        uuid,
        name,
        location,
        cost,
        duration,
        cancellationPolicy,
        languages,
        highlights,
        whatsIncluded,
        whatsExcluded,
        availableDates,
        departureDetails,
        inclusions,
        exclusions,
        knowBeforeYouGo,
        additionalInfo,
      });
      const savedTour = await newTour.save();
      res
        .status(201)
        .json({ message: "Tour created successfully", tour: savedTour });
    }
  } catch (error) {
    console.error("Error creating/updating tour:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    const filteredTours = tours.filter((tour) => tour.status !== 'disabled');
    res.status(200).json(filteredTours);
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getToursForVendor = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const tours = await Tour.find({ vendor: vendorId });
    res.status(200).json(tours);
  } catch (error) {
    console.error("Error fetching vendor tours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTourDetails = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tours = await Tour.find({ uuid: tourId });
    res.status(200).json(tours);
  } catch (error) {
    console.error("Error fetching vendor tours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateTour = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { status } = req.body;
    const tour = await Tour.findOne({ uuid: tourId });
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    if (status) {
      tour.status = status;
    }
    Object.assign(tour, req.body);
    console.log(tour)
    await tour.save();
    res.json({ message: "Tour updated successfully", tour });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTour,
  getAllTours,
  getToursForVendor,
  getTourDetails,
  updateTour,
};
