import { Request, Response, NextFunction } from "express";
import Cart from "../models/CartModel";
import CartItem from "../models/CartItemModel";
import { Op } from "sequelize";

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id, price, quantity } = req.body;
  let user_id = req.user.id;
  let cartId: any;
  try {
    let currentCartItem = await Cart.findOne({
      where: {
        user_id: user_id,
        order_id: {
          [Op.eq]: null,
        },
      },
      order: [["id", "DESC"]],
    });
    if (!currentCartItem) {
      let cartData = await Cart.create({
        user_id,
      });
      cartId = cartData.dataValues.id;
    } else {
      cartId = currentCartItem.dataValues.id;
    }
    let cartItemData = await CartItem.create({
      cart_id: cartId,
      user_id,
      grocery_item_id: id,
      price,
      quantity,
    });
    res.status(200).json({
      messge: "Item Added In Cart.",
      data: cartItemData,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
export const deleteFromCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.id; // Assuming id is passed as a route parameter

  // Check if the cart item exists
  const existingItem = await CartItem.findByPk(id);
  if (!existingItem) {
    res.status(404).json({
      message: "Cart item not found.",
    });
    return;
  }
  try {
    await existingItem.destroy();

    res.status(200).json({
      message: "Cart item removed successfully.",
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
export const bookOrder = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.body.cart_id; // Assuming id is passed as a route parameter

  // Check if the cart item exists
  const existingItem = await Cart.findOne({
    where: {
      id,
      order_id: {
        [Op.eq]: null,
      },
    },
  });
  if (!existingItem) {
    res.status(404).json({
      message: "Cart not found.",
    });
    return;
  }
  try {
    let findCartItems: any = await CartItem.findAll({
      where: {
        cart_id: id,
      },
    });
    let totalOrderAmount = 0; // Initialize total order amount

    // Iterate over each cart item and calculate subtotal
    for (const cartItem of findCartItems) {
      // Calculate subtotal for the current cart item
      const subtotal = cartItem.quantity * cartItem.price;
      // Add subtotal to the total order amount
      totalOrderAmount += subtotal;
    }
    let order_id = Date.now();
    await Cart.update(
      {
        order_id,
        order_amount: totalOrderAmount,
      },
      {
        where: {
          id,
        },
      }
    );
    await CartItem.update(
      {
        order_id,
      },
      {
        where: {
          cart_id: id,
        },
      }
    );

    res.status(200).json({
      message: "Book Order successfully.",
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
