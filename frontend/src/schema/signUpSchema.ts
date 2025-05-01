import { z } from "zod";

const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z.string().min(4, 'Password must be at least 8 characters long'),
})

export type signUpSchemaType = z.infer<typeof signUpSchema>
export default signUpSchema;
