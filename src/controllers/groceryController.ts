import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItemModel";

export const addGroceryItem = async (req: Request, res: Response) => {
  let data = await GroceryItem.create(req.body);
  res.status(200).json({
    messge: "Item Added.",
    data,
  });
};
export const updateGroceryItem = async (req: Request, res: Response) => {
  let data = await GroceryItem.update(req.query, {
    where: {
      id: req.query.id,
    },
  });
  res.status(200).json({
    messge: "Item Updated.",
    data,
  });
};
export const getGroceryItemById = async (req: Request, res: Response) => {
  const id: string = req.query.id as string; // Assuming id is passed as a query parameter
  if (!id) {
    res.status(400).json({
      message: "ID parameter missing in the request.",
    });
    return;
  }
  try {
    const data = await GroceryItem.findByPk(id);
    if (data) {
      res.status(200).json({
        message: "Item found.",
        data,
      });
    } else {
      res.status(404).json({
        message: "Item not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching grocery item:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
export const getGroceryItemList = async (req: Request, res: Response) => {
  let filters: any = {};
  let limit: number;
  let offset: number;

  if (req.query.limit && req.query.offset) {
    limit = parseInt(req.query.limit as string, 10);
    offset = (parseInt(req.query.offset as string, 10) - 1) * limit;

    delete req.query.limit;
    delete req.query.offset;
  }

  const { rows, count } = await GroceryItem.findAndCountAll({
    where: filters,
    limit,
    offset,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    data: rows,
    pagination: {
      offset: offset,
      limit: limit,
      count: count,
      totalPages: limit ? Math.ceil(count / limit) : undefined,
    },
  });
};
export const deleteGroceryItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.id; // Assuming id is passed as a route parameter

  // Check if the grocery item exists
  const existingItem = await GroceryItem.findByPk(id);
  if (!existingItem) {
    res.status(404).json({
      message: "Grocery item not found.",
    });
    return;
  }
  try {
    // Delete the grocery item
    await existingItem.destroy();

    res.status(200).json({
      message: "Grocery item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting grocery item:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
