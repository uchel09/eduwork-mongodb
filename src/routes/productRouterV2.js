import express from "express";
import ProductControllerV2 from "../controllers/productControllerV2.js";
import { upload } from "../utils/multer.js";

export const productV2Router = express.Router();

productV2Router.post("/", upload.single("image"), ProductControllerV2.create);
productV2Router.get("/", ProductControllerV2.getAll);
productV2Router.get("/:id", ProductControllerV2.getById);
productV2Router.put("/:id", upload.single("image"), ProductControllerV2.update);
productV2Router.delete("/:id", ProductControllerV2.delete);
