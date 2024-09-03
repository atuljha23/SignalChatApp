import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.create({ email, password });
    const token = createToken(email, user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
      sameSite: "none",
      secure: true,
    });
    return res.status(201).json({
      user: {
        email: user.email,
        id: user.id,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = createToken(email, user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      user: {
        email: user.email,
        id: user.id,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      email: userData.email,
      id: userData.id,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name, last name, are required" });
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      email: userData.email,
      id: userData.id,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + "-" + req.file.originalname;
    renameSync(req.file.path, fileName);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { image: fileName },
      { new: true },
      { runValidators: true }
    );
    return res.status(200).json({
      email: updatedUser.email,
      id: updatedUser.id,
      profileSetup: updatedUser.profileSetup,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      image: updatedUser.image,
      color: updatedUser.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProfileImage = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userData.image) {
      unlinkSync(userData.image);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image: null },
        { new: true }
      );
    }
    return res.status(200).json({
      email: userData.email,
      id: userData.id,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, sameSite: "none", secure: true });
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
