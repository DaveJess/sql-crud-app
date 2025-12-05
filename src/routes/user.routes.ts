import { Router } from "express";
import { UserController } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router(); 
const userController = new UserController();

router
  .get("/", authMiddleware, (req, res) => 
    (userController as any).getAllUser())
  .get("/:id", authMiddleware, (req, res) =>
    (userController as any).getUserById(req, res)
  )
  .put("/:id", authMiddleware, (req, res) =>
    (userController as any).updateUser(req, res)
  )
  .delete("/:id", authMiddleware, (req, res) =>
    (userController as any).deleteUser(req, res)
  );

export default router; 







