const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user registration
export const register = async (req,res)=>{
    try{

        const salt = await bcrypt.genSaltSync(10);

        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: hash,
        });
        await newUser.save()

        res
          .status(200)
          .json({
            status: true,
            message: "successfully created",
            
          });

    }
    catch(err){
        res.status(500).json({
          status: false,
          message: "failed to create. Try again",
        });

    }
}

// user login
export const login = async (req, res) => {
    const email = req.body.email
  try {
    const user = await User.findOne({email})
    if (!user) {
        return res.status(404).json({
          status: false,
          message: "user not found",
        });

    }
    const checkedPassword = await bcrypt.compare(req.body.password, user.password)
    if(!checkedPassword){
        return res.status(401).json({
          status: false,
          message: "Incorrect email or password",
        });
    }
    const {password,role,...rest} =user._doc

    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'15d'})

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: {...rest},
        role,
      });
} catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to login",
    });

  }
};
