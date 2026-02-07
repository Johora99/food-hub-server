import type { Category } from "../generated/prisma/enums";

export interface Meal {
  id: string;
  title: string;
  content: string;
  category: Category;
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
