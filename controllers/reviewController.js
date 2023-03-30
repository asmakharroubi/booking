const Tour = require("../models/Tour.js")
const Review = require("../models/Review.js")

export const createReview = async(req,res)=>{
    const tourId= req.params.tourId
    const newReview = new newReview({...req.body})

    try{
        const savedReview = await newReview.save()
        await Tour.findByIdAndUpdate(tourId,{
            $push: {revieews: savedReview._id}
        })
        res.status(200).json({status:true,message:"Review submitted",data:savedReview})
    }
    catch(err){
        res.status(500).json({ status: false, message: "Failed to submit" });
    }

}