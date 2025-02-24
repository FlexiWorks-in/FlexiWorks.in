import z from "zod";

const registerUserSchema = z
  .object({
    firstName: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Minimum 3 characters" }),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(3, { message: "Minimum 3 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password should have at least 8 characters" }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, {
        message: "Confirm password should have at least 8 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { registerUserSchema };
