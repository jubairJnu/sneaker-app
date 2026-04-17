import {Router} from "express";
import {reservationController} from "./reserve.controller";

const router = Router();
router.post("/", reservationController.createReservation);
// router.get("/", reservationController.getAllPurchase);

export const reserVationRoutes = router;
