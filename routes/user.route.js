import { Router } from "express";
import {register,login,logout,getUserprofile} from "../controllers/user.controller.js";
import {isLoggedIn,authorizedRoles} from "../middlewares/auth.middleware.js"
const router = Router();


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/profile",isLoggedIn,authorizedRoles("USER","ADMIN"),getUserprofile);
export default router;