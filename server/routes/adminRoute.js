import express from "express";
import { adminAuth } from "../middlewares/jwtAuth.js";
import {
  adminLogin,
  adminLogout,
  allUsers,
  deleteUser, 
  fetchUserData,
  searchUser,
  userRoleUpdate,
  userStatusUpdate,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login",adminLogin);
router.get("/user", adminAuth, fetchUserData);
router.get("/users", adminAuth, allUsers);
router.put("/update-role", adminAuth, userRoleUpdate);
router.put("/update-status", adminAuth, userStatusUpdate);
router.delete("/delete-user/:id", adminAuth, deleteUser);
router.get("/search", adminAuth, searchUser);
router.get("/logout", adminAuth, adminLogout);

export default router;
