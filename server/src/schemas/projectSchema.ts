import { z } from 'zod';

const projectSchema = z.object({
  title: z
    .string({ required_error: 'Title is required to create a project' })
    .min(3, { message: 'Title should have at least 3 characters' })
    .max(100, { message: 'Title can not be greater then 100 characters' }),
  description: z
    .string({ required_error: 'Content is required to create a project' })
    .min(3, { message: 'Content should have at least 3 characters' })
    .max(500, { message: 'Content can not be greater then 500 characters' }),
  image: z.string().optional(),
  budget: z.object({
    min: z.number(),
    max: z.number(),
  }),
  skills: z.array(z.string()),
  deadline: z.date().optional(),
  status: z.enum(['open', 'closed', 'completed']).optional(),
});

export default projectSchema;
