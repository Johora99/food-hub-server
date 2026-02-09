import express from "express"
import { userController } from "./user.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = express.Router();

router.get('/',auth(UserRole.ADMIN), userController.getAllUsers)
router.get('/:id', auth(UserRole.ADMIN), userController.getUserById)
export const userRoute = router;