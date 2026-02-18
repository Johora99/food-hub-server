import type { Category, DietaryPreference } from "../generated/prisma/enums";

export interface Meal {
  id: string;
  title: string;
  content: string;
  category: Category;
  dietary: DietaryPreference;
  price: number;
  image: string;
  isFeatured: boolean;
  isAvailable: boolean;
  views: number;
  rating: number;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type MealFilterPayload = {
  search?: string | undefined;
  dietary?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  bestSelling?: boolean | undefined; 
};

