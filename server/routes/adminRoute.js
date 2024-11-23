import express from "express";
import {
  adminLogin,
  allUsers,
  userRoleUpdate,
  userStatusUpdate,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", allUsers);
router.put("/update-role", userRoleUpdate);
router.put("/update-status",userStatusUpdate);

export default router;
