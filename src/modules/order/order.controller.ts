import type { RequestHandler } from "express"
import { orderService } from "./order.service"

const createOrder: RequestHandler = async(req, res)=>{
  try {
    if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }


  const userId = req?.user?.id as string;
  const result = await orderService.createOrder(req.body, userId);
  res.status(201).json({
    success: true,
    message: "Order added successfully.",
    data: result
   })
  } catch (error) {
    res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
    details: error
   })
  }
}

const getOrders: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const result = await orderService.getOrders(
      req.user.id as string, req.user.role as string
    );

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully.",
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
      details: error,
    });
  }
};

const getOrderById: RequestHandler = async(req, res)=>{
  try {
      if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const {id} = req.params;
    const result = await orderService.getOrderById(id as string, req.user.id as string, req.user.role as string);
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
      details: error,
    });
  }
}
export const orderController = {
  createOrder,
  getOrders,
  getOrderById,
}