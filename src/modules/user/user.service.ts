import { prisma } from "../../lib/prisma"

const getAllUsers = async()=>{
 const result = await prisma.user.findMany();
 return result;
}

const getUserById = async(id: string)=>{
  const result = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  return result;
}
export const userService = {
  getAllUsers,
  getUserById,
}