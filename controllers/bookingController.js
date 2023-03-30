import Booking from '../models/Booking.js'


export const createBooking = async (req, res) => {
  
  const newBooking = new Booking(req.body );

  try {
    const savedBooking = await newBooking.save();
    
    res
      .status(200)
      .json({ status: true, message: "Your tour is booked", data: savedBooking });
  } catch (err) {
    res.status(500).json({ status: false, message: "internal server error" });
  }
};
export const getBooking = async (req, res) =>{
    const id = req.params.id;
    try{
        const book = await Booking.findById(id)
        res
          .status(200)
          .json({
            status: true,
            message: "Successful",
            data: book,
          });
  

    }
    catch(err){
        res
          .status(404)
          .json({ status: false, message: "not found" });


    }
}

export const getAllBooking = async (req, res) => {
  
  try {
    const books = await Booking.find();
    res.status(200).json({
      status: true,
      message: "Successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "internal server error" });
  }
};