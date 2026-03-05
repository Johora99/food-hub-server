import type { RequestHandler } from "express";
import { mealService } from "./meal.service";



const createMeals: RequestHandler = async(req, res)=>{
 try {
    if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
   const result = await mealService.createMeals(req.body, req.user?.id as string);
    res.status(201).json({
    success: true,
    message: "Meal added successfully.",
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
const getAllMeals: RequestHandler = async(req, res)=>{
  try {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const dietary = typeof req.query.dietary === "string" ? req.query.dietary : undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    const bestSelling = req.query.bestSelling === "true";
    const filters = { search, dietary, minPrice, maxPrice, bestSelling };
    const result = await mealService.getAllMeals(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      details: error,
    });
  }
}

const getMyMeals: RequestHandler = async(req, res)=>{
   try {
    if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
  console.log(req.user.id)
    const result = await mealService.getMyMeals(req.user.id as string);
    res.status(200).json({
    success: true,
    data: result
    })
   } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      details: error,
    });
   }
}

const getMealById:RequestHandler = async(req, res)=>{
  try {
      if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
    const {id} = req.params;
    const result = await mealService.getMealById(id as string);
    res.status(200).json({
      success: true,
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

const deleteMeal:RequestHandler = async(req, res)=>{
 try {
  const {id} = req.params;
  const result = await mealService.deleteMeal(id as string, req.user?.id as string);
  res.status(200).json({
    success: true,
    message: "Meal deleted successfully.",
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

const updateMale:RequestHandler = async(req, res) =>{
  try {
    const {id} = req.params;
    const result = await mealService.updateMale(id as string, req.body, req.user?.id as string);
    res.status(200).json({
    success: true,
    message: "Meal updated successfully",
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

const updateOrderStatus:RequestHandler = async(req, res)=>{
  try {
    const {id} = req.params;
    const result = await mealService.updateOrderStatus(id as string, req.body);
    res.status(200).json({
    success: true,
    data: result
  })
  } catch (error) {
    res.status(500).json({
    success: false,
    details: error
   })
  }
}

const getAllCategories: RequestHandler = async(req, res)=>{
  try {
    const result = await mealService.getAllCategories();
    res.status(200).json({
    success: true,
    data: result
  })
  } catch (error) {
    res.status(500).json({
    success: false,
    details: error
   })
  }
}
const getAllDietaryPreference: RequestHandler = async(req, res)=>{
  try {
    const result = await mealService.getAllDietaryPreference();
    res.status(200).json({
    success: true,
    data: result
  })
  } catch (error) {
    res.status(500).json({
    success: false,
    details: error
   })
  }
}


export const mealsController = {
  createMeals,
  getAllMeals,
  getMyMeals,
  getMealById,
  deleteMeal,
  updateMale,
  updateOrderStatus,
  getAllCategories,
  getAllDietaryPreference,
}