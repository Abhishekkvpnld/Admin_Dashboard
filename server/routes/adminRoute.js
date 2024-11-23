import express from "express";
import {
  adminLogin,
  allUsers,
  deleteUser,
  userRoleUpdate,
  userStatusUpdate,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", allUsers);
router.put("/update-role", userRoleUpdate);
router.put("/update-status", userStatusUpdate);
router.delete("/delete-user/:id", deleteUser);

export default router;
