import { Router } from "express";
const router = Router();

import userRouter from "./userRoutes";
import groceryRouter from "./groceryRoutes";
import orderRouter from "./orderRoutes";

router.use("/users", userRouter);
router.use("/grocery", groceryRouter);
router.use("/order", orderRouter);

export default router;
