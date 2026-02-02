import express from "express"
import cors from "cors"
import { providerRoute } from "./modules/provider/provider.route";

const app = express();
app.use(express.json());

app.use(cors())


app.get('/', (req, res)=>{
  res.send("Hello world")
})


app.use('/api/provider', providerRoute)

export default app;