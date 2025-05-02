import { ZodTypeAny } from "zod";

import { ZodString } from "zod";

import { ZodObject } from "zod";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  discount: number;
  image: string;
};

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

