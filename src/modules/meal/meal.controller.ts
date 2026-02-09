import type { RequestHandler } from "express";
import { providerService } from "./meal.service";


const createMeals: RequestHandler = async(req, res)=>{
 try {
    if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
   const result = await providerService.createMeals(req.body, req.user?.id as string);
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

const getMealById:RequestHandler = async(req, res)=>{
  try {
      if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
    const {id} = req.params;
    const result = await providerService.getMealById(id as string);
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
  const result = await providerService.deleteMeal(id as string);
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
    const result = await providerService.updateMale(id as string, req.body);
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
    const result = await providerService.updateOrderStatus(id as string, req.body);
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
  getMealById,
  deleteMeal,
  updateMale,
  updateOrderStatus,
}