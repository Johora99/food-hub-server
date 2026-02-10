import { prisma } from "../../lib/prisma";
import type { CreateOrderPayload } from "../../types/order.type"


const createOrder = async(payload: CreateOrderPayload, customerId: string)=>{
  const meal = await prisma.meal.findUnique({
    where: { id: payload.mealId },
  });

 if (!meal) {
    throw new Error("Meal not found");
  }

  const totalPrice = meal.price * payload.quantity;

   const result = await prisma.order.create({
    data: {
      quantity: payload.quantity,
      address: payload.address,
      phone: payload.phone,
      paymentStatus: payload.paymentStatus,
      totalPrice, 

      // 🔗 Relations
      meal: {
        connect: { id: payload.mealId },
      },
      customer: {
        connect: { id: customerId },
      },
      provider: {
        connect: { id: meal.providerId },
      },
    },
    include: {
      meal: true,
      provider: true,
      customer: true,
    },
  });
   return result
}


const getOrders = async(userId: string, role: string)=>{

  if (role === "CUSTOMER") {
    return await prisma.order.findMany({
      where: {
        customerId: userId,
      },
      include: {
        meal: true,
        provider: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }


  if (role === "PROVIDER") {
    return await prisma.order.findMany({
      where: {
        providerId: userId,
      },
      include: {
        meal: true,
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  if (role === "ADMIN") {
    return await prisma.order.findMany({
      include: {
        meal: true,
        provider: true,
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  throw new Error("Invalid role");
};

const getOrderById = async(orderId: string, userId: string, role: string )=>{
 if (role === "ADMIN") {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        meal: true,
        customer: true,
        provider: true,
      },
    });
    return order;
  }

  if (role === "CUSTOMER") {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerId: userId,
      },
      include: {
        meal: true,
        provider: true,
      },
    });
    return order;
  }

  if (role === "PROVIDER") {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        providerId: userId,
      },
      include: {
        meal: true,
        customer: true,
      },
    });
    return order;
  }

  throw new Error("Invalid role");
};



export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
}