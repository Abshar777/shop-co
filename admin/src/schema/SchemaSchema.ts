import { z } from "zod";

const schemaSchema = z.object({
    name: z.string().min(2, "At least 2 characters required"),
    websSiteUrl: z.string().url("Invalid URL"),
    fields: z.array(z.object({
        name: z.string().min(2, "At least 2 characters required"),
        type: z.enum(["text", "number", "email", "password", "date", "time", "checkbox", "radio", "select", "textarea"])
    }))
});

export type schemaSchemaType = z.infer<typeof schemaSchema>;
export default schemaSchema;
