import { Router } from "express";
import { registerUser, loginUser, changePassword } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/changePassword").post(auth, changePassword);



export default router;
