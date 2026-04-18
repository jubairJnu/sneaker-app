import {Router} from "express";
import {productRoutes} from "../module/products/product.routes";
import {reserVationRoutes} from "../module/reserve.routes";

const router = Router();

const routers = [
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/reservation",
    route: reserVationRoutes,
  },
];

routers.forEach((route) => router.use(route.path, route.route));

export default router;
