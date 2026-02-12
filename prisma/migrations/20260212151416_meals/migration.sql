/*
  Warnings:

  - Added the required column `dietary` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('VEGAN', 'VEGETARIAN', 'HALAL', 'KETO', 'GLUTEN_FREE', 'DAIRY_FREE', 'LOW_CARB', 'PALEO');

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "dietary" "DietaryPreference" NOT NULL;
