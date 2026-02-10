import express from "express"
import cors from "cors"
import { providerRoute } from "./modules/meal/meal.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { userRoute } from "./modules/user/user.route";
import { orderRoute } from "./modules/order/order.route";


const app = express();
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000 ",
  credentials: true
}))


app.get('/', (req, res)=>{
  res.send("Hello world")
})


app.use('/api', providerRoute)
app.use('/api/admin/users', userRoute)
app.use('/api/orders', orderRoute)
export default app;