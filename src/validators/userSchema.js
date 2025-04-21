import { z } from 'zod';

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
  name: z.string().min(2).max(20),
});

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});
