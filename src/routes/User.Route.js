import { Router } from 'express';
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import { verifyjwt } from '../middlewares/auth.middleware.js';

const router = Router();

// REGISTER
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registerUser
);

// LOGIN
router.post("/login", loginUser);

// PROFILE
router.get("/profile", verifyjwt, (req, res) => {
  res.status(200).json({
    message: "secured profile route",
    user: req.user
  });
});

export default router;
