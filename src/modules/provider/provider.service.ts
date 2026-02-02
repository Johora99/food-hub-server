import { prisma } from "../../lib/prisma";



const createMeals = async(data)=>{
  try {
   const result = await prisma.meal.create({
    data: data
   })
   return result;
  } catch (error) {
    console.log(error)
  }
}

export const providerService = {
  createMeals,
}