const Tour = require("../models/Tour.js")


// create new tour
// export const createTour = async (req,res) =>{
  module.exports.createTour = async (req,res) =>{
    const newTour = new Tour(req.body)
    try{
        const savedTour = await newTour.save()

        res.status(200).json({status:true,message: "successfully created",data: savedTour})
    }
    catch(err) {
        res.status(500).json({status:false,message: "failed to create. Try again"})

    }
}

// update tour
module.exports.updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        satus: true,
        message: "successfully updated",
        data: updatedTour,
      });
  } catch (err) {
    res.status(500).json({ satus: false, message: "failed to update" });
  }
};
// delete tour
module.exports.deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      satus: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ satus: false, message: "failed to delete" });
  }
};
// getsingle tour
module.exports.getsingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");

    res.status(200).json({
      satus: true,
      message: "successfully deleted",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({ satus: false, message: "not found" });
  }
};
// getAll tour
module.exports.getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      satus: true,
      count: tours.length,
      message: "successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ satus: false, message: "not found" });
  }
};

// get tour by search 
module.exports.getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: mawGroupSize },
    }).populate("reviews");

    res.status(200).json({
      satus: true,
      message: "successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ satus: false, message: "not found" });
  }
};

// get featured tour
module.exports.getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      satus: true,

      message: "successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ satus: false, message: "not found" });
  }
};

// get tour counts
module.exports.getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      satus: true,
      data: tourCount,
    });
  } catch (err) {
    res.status(500).json({ satus: false, message: "failed to fetch" });
  }
};