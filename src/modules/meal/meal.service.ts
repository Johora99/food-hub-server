import { prisma } from "../../lib/prisma";
import type { Meal } from "../../types/meal.type";



const createMeals = async(data: Meal, providerId: string)=>{
   const result = await prisma.meal.create({
    data: {
      ...data, providerId
    }
   })
   return result;
}

const getMealById = async(id: string)=>{
  const mealData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: id,
      
    },
    select: {
    id: true
  }
  });
  if(!mealData){
    throw new Error("Your provided data is invalid");
  }
  const result = await prisma.meal.findUnique({
    where: {
      id: id,
    
    }
  })
  return result;

}

const deleteMeal = async(id: string)=>{
  const mealData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: id
    },
    select: {
    id: true
  }
  });
  if(!mealData){
    throw new Error("Your provided data is invalid");
  }
  const result = await prisma.meal.delete({
    where: {
      id: id
    }
  })
  return result;

}

const updateMale = async(id: string, data: Partial<Meal>)=>{
  const mealData = await prisma.meal.findUnique({
    where: {
      id: id
    }
  });
  if(!mealData){
    throw new Error("Your provided data is invalid");
  }
    const result = await prisma.meal.update({
      where: {
        id: id
      },
      data
    })
    return result;

}

const updateOrderStatus = async(id: string, data: string)=>{
  try {
    
  } catch (error) {
    console.log(error)
  }
}

export const providerService = {
  createMeals,
  getMealById,
  deleteMeal,
  updateMale,
  updateOrderStatus,
}