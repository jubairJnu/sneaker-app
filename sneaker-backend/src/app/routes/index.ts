import {Router} from "express";
import {productRoutes} from "../module/products/product.routes";

const router = Router();

const routers = [
  {
    path: "/products",
    route: productRoutes,
  },
];

routers.forEach((route) => router.use(route.path, route.route));

export default router;
