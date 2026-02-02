import express from "express"
import { mealsController } from "./provider.controller";
const router = express.Router();


router.post('/meals', mealsController.createMeals)

export const providerRoute = router;