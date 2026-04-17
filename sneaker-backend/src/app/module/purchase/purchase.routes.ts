import {Router} from "express";
import {purchaseControllers} from "./purchase.controller";

const router = Router();
router.post("/", purchaseControllers.createPurchase);
router.get("/", purchaseControllers.getAllPurchase);

export const purchaseRoutes = router;
