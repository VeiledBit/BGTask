import express from "express";
import { Request, Response } from "express";
import { apiFiles } from "../controllers/apiController";
import { cacheMiddleware } from "../middleware/cache";

const router = express.Router();

router.get("/api/files", cacheMiddleware, (req: Request, res: Response) => apiFiles(req, res));

export default router;