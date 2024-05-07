import { Router } from "express";
const router = Router();

import userRouter from "./userRoutes";
import groceryRouter from "./groceryRoutes";

router.use("/users", userRouter);
router.use("/grocery", groceryRouter);

export default router;
