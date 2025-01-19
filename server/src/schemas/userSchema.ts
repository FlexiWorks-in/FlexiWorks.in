import { z } from 'zod';

const registerUserSchema = z.object({
  firstName: z
    .string({ required_error: 'first name is required to create a user' })
    .min(3, { message: 'first name should have at least 3 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'last name should have at least 3 characters' })
    .max(20, { message: 'last name can not be greater then 20 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, 'Password should have at least 8 characters'),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

export { loginUserSchema, registerUserSchema };
