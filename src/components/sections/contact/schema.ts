import { z } from "zod";

export const budgetRange = { min: 25_000, max: 500_000, step: 5000 };

export const formSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email: z.email("Enter a valid work email"),
  company: z.string().trim().min(1, "Enter your company"),
  need: z.string().min(1, "Choose the closest match"),
  budget: z.tuple([z.number(), z.number()]),
  timing: z.string().min(1, "Choose when you would like to start"),
  details: z.string().trim(),
});

export type Values = z.infer<typeof formSchema>;

export const defaultValues: Values = {
  name: "",
  email: "",
  company: "",
  need: "",
  budget: [75_000, 250_000],
  timing: "",
  details: "",
};
