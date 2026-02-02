import type { RequestHandler } from "express";
import { providerService } from "./provider.service";

const createMeals: RequestHandler = async(req, res)=>{
 try {
   const result = await providerService.createMeals(req.body);
   console.log(result)
    res.status(201).json({
    success: true,
    data: result
   })
 } catch (error) {
  
 }
}

export const mealsController = {
  createMeals,
}