
import { Category, DietaryPreference } from "../../generated/prisma/enums";
import type { MealWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import type { Meal, MealFilterPayload } from "../../types/meal.type";



const createMeals = async(data: Meal, providerId: string)=>{
   const result = await prisma.meal.create({
    data: {
      ...data, providerId
    }
   })
   return result;
}

const getAllMeals = async (filters: MealFilterPayload) => {
  const { search, dietary, minPrice, maxPrice, bestSelling } = filters;

  const ANDConditions: any[] = [];

  if (search) {
    const matchedCategory = Object.values(Category).find(
      (cat) => cat.toLowerCase() === search.toLowerCase()
    );
    if (matchedCategory) {
      ANDConditions.push({ category: matchedCategory });
    } else {
      ANDConditions.push({
        title: { contains: search, mode: "insensitive" },
      });
    }
  }

  if (dietary) {
    const matchedDietary = Object.values(DietaryPreference).find(
      (diet) => diet.toLowerCase() === dietary.toLowerCase()
    );
    if (matchedDietary) {
      ANDConditions.push({ dietary: matchedDietary });
    }
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    ANDConditions.push({
      price: {
        gte: minPrice ?? 0,
        lte: maxPrice ?? 999999,
      },
    });
  }

  const meals = await prisma.meal.findMany({
    where: { AND: ANDConditions },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  return bestSelling
    ? meals.filter((meal) => meal._count.orders >= 5)
    : meals;
};






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
  
}



const getAllCategories = async()=>{
  const result = Object.values(Category);
  return result;
}
const getAllDietaryPreference = async()=>{
  const result = Object.values(DietaryPreference);
  return result;
}



export const mealService = {
  createMeals,
  getAllMeals,
  getMealById,
  deleteMeal,
  updateMale,
  updateOrderStatus,
  getAllCategories,
  getAllDietaryPreference,
}