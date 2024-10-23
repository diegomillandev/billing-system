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
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const StockFetch = z.array(
  StockChema.pick({
    _id: true,
    productId: true,
    quantity: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
  })
);

export type Stock = z.infer<typeof StockChema>;
export type StockForm = Pick<Stock, "productId" | "quantity">;

// user client
const ClientSchema = z.object({
  _id: z.string(),
  name: z.string(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string(),
  dni: z.string().optional(),
  address: z.string().optional(),
  city: z.string(),
  state: z.string(),
  buys: z.number(),
  observations: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ClientFetch = z.array(
  ClientSchema.pick({
    _id: true,
    name: true,
    lastname: true,
    email: true,
    phone: true,
    dni: true,
    address: true,
    city: true,
    state: true,
    buys: true,
    observations: true,
  })
);

export type Client = z.infer<typeof ClientSchema>;
export type ClientForm = Pick<
  Client,
  | "name"
  | "lastname"
  | "email"
  | "phone"
  | "dni"
  | "address"
  | "city"
  | "state"
  | "observations"
>;

// product sale
const ProductSaleSchema = z.object({
  _id: z.string(),
  productId: ProductSchema,
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});

export const ProductSaleFetch = z.array(
  ProductSaleSchema.pick({
    _id: true,
    productId: true,
    quantity: true,
    price: true,
    total: true,
  })
);

export type ProductSale = z.infer<typeof ProductSaleSchema>;
export type ProductSaleForm = Pick<
  ProductSale,
  "productId" | "quantity" | "total"
>;

const OrderProductSchema = z.object({
  productId: ProductSchema,
  quantity: z.number(),
  total: z.number(),
  _id: z.string(),
});

export const OrderSchema = z.object({
  _id: z.string(),
  clientId: ClientSchema,
  products: z.array(OrderProductSchema),
  invoiceNumber: z.string(),
  saleDate: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const OrdersSchema = z.array(OrderSchema);
export type Order = z.infer<typeof OrderSchema>;

//  user model
export const UserSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
export type userForm = Pick<User, "email" | "password">;
