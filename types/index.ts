import { z } from "zod";

//  client model
const Client = z.object({
  id: z.string(),
  name: z.string(),
  lastname: z.string(),
  dni: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  observations: z.string(),
});
export type Client = z.infer<typeof Client>;
export type ClientForm = Omit<Client, "id">;

//  category model
const Category = z.object({
  id: z.string(),
  name: z.string(),
  active: z.string(),
  description: z.string(),
});
export type Category = z.infer<typeof Category>;
export type CategoryForm = Omit<Category, "id">;
