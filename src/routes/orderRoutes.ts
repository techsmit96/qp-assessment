import { Router } from "express";
import {
  addToCartController,
  deleteFromCartItem,
  bookOrder,
} from "../controllers/orderController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
const router = Router();

router.post(
  "/add-to-cart",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.userAuth,
  addToCartController
);
router.delete(
  "/remove-from-cart/:id",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.userAuth,
  deleteFromCartItem
);
router.post(
  "/book-order",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.userAuth,
  bookOrder
);

export default router;
