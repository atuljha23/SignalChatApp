import { Router } from "express";
import {
  addProfileImage,
  deleteProfileImage,
  getUserInfo,
  login,
  logOut,
  signup,
  updateProfile,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/profiles/" });
const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profileImage"),
  addProfileImage
);
authRoutes.delete("/delete-profile-image", verifyToken, deleteProfileImage);
authRoutes.post("/logout", verifyToken, logOut);

export default authRoutes;
