import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please Enter All Details");
    }

    const checkUser = await userModel.findOne({ email: email });

    if (!checkUser) {
      throw new Error("User Not Registered...🤦‍♂️");
    }

    if (checkUser.role !== "Admin") {
      throw new Error("Permision denied ,You are not an Admin...❌");
    }

    const CheckPassword = await bcrypt.compare(password, checkUser.password);

    if (!CheckPassword) {
      throw new Error("Invalid Credentials...❌");
    }

    const userData = {
      _id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
      role: checkUser.role,
      status: checkUser.status,
      phone: checkUser.phone,
      createdAt: checkUser.createdAt,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    if (!token) {
      throw new Error("Token generation failed");
    }

    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res
      .cookie("token", token, tokenOption)
      .status(200)
      .json({
        success: true,
        error: false,
        message: "Logged in Successfully...✅",
        data: { user: checkUser, token },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const fetchUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new Error("Please login first...🔐");
    }

    const userData = await userModel.findById(userId).lean();
    if (!userData) {
      throw new Error("User not found...❌");
    }

    delete userData.password;

    res.status(200).json({
      success: true,
      error: false,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const fetchAllUsers = await userModel.find();

    res.status(200).json({
      success: true,
      error: false,
      data: fetchAllUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const userRoleUpdate = async (req, res) => {
  try {
    const { role, id } = req.body;
    const userId = req.user._id;

    const requestingUser = await userModel.findById(userId);
    if (!requestingUser) {
      throw new Error("Requesting user not found...❌");
    }

    // Check if the requesting user is an Admin
    if (requestingUser.role !== "Admin") {
      throw new Error("Permission denied. Only Admins can update roles.");
    }

    const updateUser = await userModel.findById(id);
    if (!updateUser) {
      throw new Error("User not Found...❌");
    }

    const validRoles = ["User", "Admin"];
    if (!validRoles.includes(role)) {
      throw new Error("Invalid role specified. Must be 'User' or 'Admin'.");
    }

    updateUser.role = role;
    await updateUser.save();

    res.status(200).json({
      success: true,
      error: false,
      data: {
        _id: updateUser._id,
        userName: updateUser.userName,
        email: updateUser.email,
        role: updateUser.role,
        status: updateUser.status,
        phone: updateUser.phone,
        createdAt: updateUser.createdAt,
      },
      message: "User role updated successfully.✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const userStatusUpdate = async (req, res) => {
  try {
    const { status, id } = req.body;
    const userId = req.user._id;

    const requestingUser = await userModel.findById(userId);
    if (!requestingUser) {
      throw new Error("Requesting user not found...❌");
    }

    if (requestingUser.role !== "Admin") {
      throw new Error("Permission denied. Only Admins can update roles.");
    }

    const updateUser = await userModel.findById(id);
    if (!updateUser) {
      throw new Error("User not Found...❌");
    }

    const validStatus = ["Active", "InActive"];
    if (!validStatus.includes(status)) {
      throw new Error(
        "Invalid status specified. Must be 'Active' or 'InActive'."
      );
    }

    updateUser.status = status;
    await updateUser.save();

    res.status(200).json({
      success: true,
      error: false,
      data: {
        _id: updateUser._id,
        userName: updateUser.userName,
        email: updateUser.email,
        role: updateUser.role,
        status: updateUser.status,
        phone: updateUser.phone,
        createdAt: updateUser.createdAt,
      },
      message: "User status updated successfully.✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const requestingUser = await userModel.findById(userId);
    if (!requestingUser) {
      throw new Error("Requesting user not found...❌");
    }

    if (requestingUser.role !== "Admin") {
      throw new Error("Permission denied. Only Admins can update roles.");
    }

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not Found...❌");
    }

    const deleteUser = await userModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      error: false,
      message: `User ${user.userName} Deleted Successfully...✅`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { username } = req.query;
    const userId = req.user._id;

    if (!username) {
      throw new Error("Please enter a username to search...");
    }

    const requestingUser = await userModel.findById(userId);
    if (!requestingUser) {
      throw new Error("Requesting user not found...❌");
    }

    if (requestingUser.role !== "Admin") {
      throw new Error("Permission denied. Only Admins can update roles.");
    }

    const regExp = new RegExp(username, "i");
    const allDoc = await userModel.find({ userName: { $regex: regExp } });

    if (allDoc.length === 0) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "No users found with the given username...❌",
        data: allDoc || [],
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      data: allDoc,
      message: "user found✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("token", tokenOption);

    res.status(200).json({
      message: "Logged out successfully...🎉",
      data: [],
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
