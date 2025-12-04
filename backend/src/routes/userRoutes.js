import { Router } from "express";
import { register, login } from "../controller/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

export default router;
