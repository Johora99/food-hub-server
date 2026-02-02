-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Bangladeshi', 'Indian', 'Chinese', 'Italian', 'Thai', 'Mexican', 'Japanese', 'Korean', 'MiddleEastern', 'Continental');

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(225) NOT NULL,
    "content" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);
