import express from "express"
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post('/', auth(UserRole.CUSTOMER), orderController.createOrder)
router.get('/', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrders)
router.get('/:id', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrderById)
export const orderRoute = router;