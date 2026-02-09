import type { RequestHandler } from "express"
import { userService } from "./user.service"

const getAllUsers: RequestHandler = async(req, res)=>{
  try {
    if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
    const result = await userService.getAllUsers();
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

const getUserById: RequestHandler = async(req, res)=>{
  try {
    if(!req.user){
    return res.status(400).json({
    success: false,
    message: "Unauthorized"
   })
  }
  
  const {id} = req.params;
  const result = await userService.getUserById(id as string);
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

export const userController = {
       getAllUsers,
       getUserById,
}