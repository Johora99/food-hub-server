export interface CreateOrderPayload {
  mealId: string;
  quantity: number;
  address: string;
  phone: string;
  paymentStatus: "COD" | "PAID";
}