import { z } from "zod";

export interface IAddress {
    street: string;
    city: string;
    country: string;
    postalCode: string;
    address: string;
}

export const addressSchema = z.object({
    street: z.string().min(1, {
        message: "Please enter a valid address",
    }),
    address: z.string().min(1, {
        message: "Please enter a valid address",
    }),
    city: z.string().min(1, {
        message: "Please enter a valid city",
    }),
    country: z.string().min(1, {
        message: "Please enter a valid country",
    }),
    postalCode: z
        .string()
        .min(1, {
            message: "Please enter a valid pincode",
        })
        .max(6, {
            message: "Please enter a valid pincode",
        })
        .regex(/^\d+$/, {
            message: "Please enter a valid pincode",
        })


});
