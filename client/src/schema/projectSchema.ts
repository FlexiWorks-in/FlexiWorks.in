import z from "zod";

const projectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Minimum 3 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Minimum 3 characters" }),
});

export { projectSchema };
