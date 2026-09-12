import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),

  business: z
    .string()
    .trim()
    .max(150, "Business name must be 150 characters or less")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email address is too long"),

  projectType: z.enum([
    "business-website",
    "web-application",
    "business-system",
    "e-commerce",
    "website-redesign",
    "digital-growth",
    "not-sure",
  ]),

  budget: z
    .enum(["under-50k", "50k-100k", "100k-250k", "250k-plus", "not-sure"])
    .optional(),

  timeline: z
    .enum(["asap", "1-month", "1-3-months", "3-plus-months", "flexible"])
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project")
    .max(5000, "Message must be 5000 characters or less"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
