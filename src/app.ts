import express from "express"
import cors from "cors"

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { userRoute } from "./modules/user/user.route";
import { orderRoute } from "./modules/order/order.route";
import { mealRoute } from "./modules/meal/meal.route";


const app = express();


app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}))

app.all("/api/auth/*splat", toNodeHandler(auth));
app.get('/', (req, res)=>{
  res.send("Hello world")
})


app.use('/api', mealRoute)
app.use('/api/admin/users', userRoute)
app.use('/api/orders', orderRoute)
export default app;