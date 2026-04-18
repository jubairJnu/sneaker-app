import {Router} from "express";
import {productRoutes} from "../module/products/product.routes";
import {reserVationRoutes} from "../module/reserve.routes";
import {purchaseRoutes} from "../module/purchase/purchase.routes";

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
  {
    path: "/purchase",
    route: purchaseRoutes,
  },
];

routers.forEach((route) => router.use(route.path, route.route));

export default router;
