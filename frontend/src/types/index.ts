import { ZodTypeAny } from "zod";

import { ZodString } from "zod";

import { ZodObject } from "zod";
import { ISize } from "./IProduct";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: ISize[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  discount: number;
  originalPrice: number;
}

export interface Testimonial {
  id: number
  name: string
  stars: number
  text: string
  verified: boolean
}



export interface IAuthSchema extends ZodObject<{
  email: ZodString;
  password: ZodString;
}, "strip", ZodTypeAny, {
  email: string;
  password: string;
  name: string;
}, {
  email: string;
  password: string;
  name: string;
}> {}

