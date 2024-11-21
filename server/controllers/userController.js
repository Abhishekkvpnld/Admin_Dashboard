import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const addNewUser = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;

    if (!userName || !email || !password || !phone) {
      throw new Error("Please add all details...📩");
    }

    const encryptPassword = bcrypt.hash(password, 10);

    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      throw new Error("User already exists with this email.");
    }

    const user = new userModel({
      userName,
      email,
      phone,
      password: encryptPassword,
    });

    await user.save();

    res.status(200).json({
        success:true,
        error:false,
        message:"User Created Successfully...✅✅"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const allUsers = async(req,res)=>{
    try {
        const fetchAllUsers = await userModel.find();
        
        res.status(200).json({
            success:true,
            error:false,
            data:fetchAllUsers
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
    }
}
