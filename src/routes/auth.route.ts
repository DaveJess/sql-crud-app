import { response, Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.createUser(req, res));
router.post("/login", (req, res) => authController.loginUser(req, res));

//create a

export default router; 