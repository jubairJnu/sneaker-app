import {Router} from "express";
import {productControllers} from "./product.controller";

const router = Router();
router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProduct);

export const productRoutes = router;
