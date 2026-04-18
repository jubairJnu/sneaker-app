import {Router} from "express";
import {reservationController} from "./reserve.controller";

const router = Router();
router.post("/", reservationController.createReservation);
router.get("/:id", reservationController.getReservationByUserId);

export const reserVationRoutes = router;
