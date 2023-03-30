const User = require("../models/User.js");

// create new User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();

    res
      .status(200)
      .json({ status: true, message: "successfully created", data: savedUser });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "failed to create. Try again" });
  }
};

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      satus: true,
      message: "successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ satus: false, message: "failed to update" });
  }
};
// delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      satus: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ satus: false, message: "failed to delete" });
  }
};
// getsingle User
export const getsingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    res.status(200).json({
      satus: true,
      message: "successfully deleted",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ satus: false, message: "not found" });
  }
};
// getAll User
export const getAllUser = async (req, res) => {
  
  try {
    const users = await User.find({})
      

    res.status(200).json({
      satus: true,
      
      message: "successful",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ satus: false, message: "not found" });
  }
};

