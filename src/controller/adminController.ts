// src/controller/adminController.ts
import { Request, Response } from "express";
import { AdminService } from "../service/user/admin.service";

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  async getAllAdmins(req: Request, res: Response): Promise<void> {
    try {
      const admins = await this.adminService.getAllAdmins();
      res.status(200).json({
        success: true,
        data: admins,
      });
    } catch (err) {
      console.error("Failed to fetch admins:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch admins",
      });
    }
  }

  async getAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: "Admin id is required" });
        return;
      }

      const admin = await this.adminService.getAdmin(id);
      if (!admin) {
        res.status(404).json({ success: false, message: "Admin not found" });
        return;
      }

      res.status(200).json({ success: true, data: admin });
    } catch (err) {
      console.error("Failed to get admin:", err);
      res.status(500).json({ success: false, message: "Failed to get admin" });
    }
  }

  async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      const newAdmin = await this.adminService.createAdmin(req.body);
      res.status(201).json({
        success: true,
        data: newAdmin,
      });
    } catch (err) {
      console.error("Failed to create new admin:", err);
      res.status(400).json({
        success: false,
        message: "Failed to create admin",
      });
    }
  }

  async updateAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: "Admin id is required" });
        return;
      }

      const updatedAdmin = await this.adminService.updateAdmin(id, req.body);
      if (!updatedAdmin) {
        res.status(404).json({ success: false, message: "Admin not found" });
        return;
      }

      res.status(200).json({ success: true, data: updatedAdmin });
    } catch (err) {
      console.error("Failed to update admin:", err);
      res.status(500).json({ success: false, message: "Failed to update admin" });
    }
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: "Admin id is required" });
        return;
      }

      const deletedAdmin = await this.adminService.deleteAdmin(id);
      if (!deletedAdmin) {
        res.status(404).json({ success: false, message: "Admin not found" });
        return;
      }

      res.status(200).json({ success: true, message: "Admin successfully deleted" });
    } catch (err) {
      console.error("Failed to delete admin:", err);
      res.status(500).json({ success: false, message: "Failed to delete admin" });
    }
  }
}