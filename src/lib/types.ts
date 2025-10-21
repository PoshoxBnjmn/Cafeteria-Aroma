
export type ProductCategory = 'Bebestibles Calientes' | 'Frappes / Bebidas Frías' | 'Dulces' | 'Salados' | 'Canjeables';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  imageHint: string;
  points?: number; // Points awarded when purchased
  pointsCost?: number; // Points needed to redeem
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    pointsAwarded?: number;
  }[];
  total: number;
  totalPointsAwarded: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  points: number;
  password?: string; // This is for mock purposes, DO NOT do this in a real app.
  role?: 'admin';
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  image: string;
  imageHint: string;
};

export type PointsHistoryEntry = {
    id: string;
    userId: string;
    date: string;
    description: string;
    amount: number; // positive for earning, negative for spending
};

export type UpdateUserPayload = {
    name?: string;
    profilePicture?: string;
}

export type UpdateProductPayload = {
    name?: string;
    price?: number;
    image?: string;
    pointsCost?: number;
}
