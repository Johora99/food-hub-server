import express from "express"
import { mealsController } from "./meal.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = express.Router();


router.post('/provider/meals', auth(UserRole.PROVIDER), mealsController.createMeals)
router.get('/meals', mealsController.getAllMeals)
router.get('/provider/meals', auth(UserRole.PROVIDER), mealsController.getMyMeals)
router.get('/category', mealsController.getAllCategories)
router.get('/dietary', mealsController.getAllDietaryPreference)
router.get('/meals/:id', auth(), mealsController.getMealById)
router.delete('/provider/meals/:id', auth(UserRole.PROVIDER), mealsController.deleteMeal)
router.put('/provider/meals/:id', auth(UserRole.PROVIDER), mealsController.updateMale)
export const mealRoute = router;