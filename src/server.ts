import app from "./app.js";
import { prisma } from "./lib/prisma";



const port = process.env.PORT || 5000;

async function main(){
try {
      await prisma.$connect();
    console.log("Connected to the database successfully")
  app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
  })
} catch (error) {
   console.error(error)
    await prisma.$disconnect()
    process.exit(1)
}
}

main();