import { Router } from "express";
import {
  addGroceryItem,
  deleteGroceryItem,
  getGroceryItemById,
  getGroceryItemList,
  updateGroceryItem,
} from "../controllers/groceryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
const router = Router();

router.post(
  "/add-grocery-item",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.adminAuth,
  addGroceryItem
);
router.put(
  "/update-grocery-item",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.adminAuth,
  updateGroceryItem
);
router.get(
  "/get-grocery-item-by-id",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.adminAuth,
  getGroceryItemById
);
router.get(
  "/get-grocery-item-list",
  GlobalMiddleWare.authenticate,
  getGroceryItemList
);
router.delete(
  "/delete-grocery-item-by-id/:id",
  GlobalMiddleWare.authenticate,
  GlobalMiddleWare.adminAuth,
  deleteGroceryItem
);

export default router;
