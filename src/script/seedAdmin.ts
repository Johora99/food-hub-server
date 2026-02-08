import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin(){
  try {
    const adminData = {
    name: "Admin",
    email: "admin@gmail.com",
    role: UserRole.ADMIN,
    password: "admin123",
   }

   const isExist = await prisma.user.findUnique({
    where: {
      email: adminData.email
    }
   })

     if(isExist){
      throw new Error("Admin already exist");
    }

    const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": process.env.BETTER_AUTH_URL!,
      },
      body: JSON.stringify(adminData)
    })

    if(signUpAdmin.ok){
      await prisma.user.update({
        where: {
          email: adminData.email
        },
        data: {
          emailVerified: true
        }
      })
      
  console.log("✅ Admin seeded successfully");
    }
  } catch (error) {
    console.log(error)
  }
}

seedAdmin();



