import { z } from "zod";

//  category model
export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  active: z.string(),
  products: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CategorySelect = z.array(
  CategorySchema.pick({
    _id: true,
    name: true,
    description: true,
    active: true,
    products: true,
    createdAt: true,
    updatedAt: true,
  })
);
export type Category = z.infer<typeof CategorySchema>;
export type CategoryForm = Pick<Category, "name" | "active" | "description">;

// product model
const ProductSchema = z.object({
  _id: z.string(),
  code: z.string(),
  name: z.string(),
  price: z.number(),
  costPrice: z.number(),
  categoryId: CategorySchema.or(z.string()),
  stock: z.string(),
  description: z.string(),
});

export const ProductSelect = z.array(
  ProductSchema.pick({
    _id: true,
    name: true,
    code: true,
    price: true,
    costPrice: true,
    description: true,
    categoryId: true,
  })
);
export type Product = z.infer<typeof ProductSchema>;
export type ProductForm = Pick<
  Product,
  "code" | "name" | "price" | "costPrice" | "categoryId" | "description"
>;

// stock model
const StockChema = z.object({
  _id: z.string(),
  productId: ProductSchema.or(z.string()),
  quantity: z.number(),
  sold: z.number(),
});

export const StockSelect = z.array(
  StockChema.pick({
    _id: true,
    productId: true,
    quantity: true,
    sold: true,
  })
);
export type Stock = z.infer<typeof StockChema>;
export type StockForm = Pick<Stock, "productId" | "quantity">;
