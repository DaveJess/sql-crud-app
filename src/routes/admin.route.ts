import { Router, Request, Response } from "express";
import { AdminController } from "./../controller/adminController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
const adminController = new AdminController();

router
  .get("/", authMiddleware, (req: Request, res: Response) => 
    adminController.getAllAdmins(req, res))
  .get("/:id", authMiddleware, (req: Request, res: Response) => 
    adminController.getAdmin(req, res))
  .post("/:id", authMiddleware, (req: Request, res: Response) => 
    adminController.createAdmin(req, res))
  .put("/:id", authMiddleware, (req: Request, res: Response) => 
    adminController.updateAdmin(req, res))
  .delete("/:id", authMiddleware, (req: Request, res: Response) => 
    adminController.deleteAdmin(req, res));

export default router