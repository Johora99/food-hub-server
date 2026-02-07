import express from "express"
import { mealsController } from "./meal.controller";
const router = express.Router();


router.post('/provider/meals', mealsController.createMeals)
router.get('/meals/:id', mealsController.getMealById)
router.delete('/provider/meals/:id', mealsController.deleteMeal)
router.put('/provider/meals/:id', mealsController.updateMale)
export const providerRoute = router;