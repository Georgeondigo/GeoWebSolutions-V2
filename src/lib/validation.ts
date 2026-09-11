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
    "Business website",
    "Web application",
    "Business system",
    "E-commerce",
    "Website redesign",
    "Digital growth",
    "Not sure yet",
  ]),

  budget: z
    .enum([
      "Under KES 50,000",
      "KES 50,000 – 100,000",
      "KES 100,000 – 250,000",
      "KES 250,000+",
      "Not sure yet",
    ])
    .optional(),

  timeline: z
    .enum([
      "asap",
      "1-month",
      "1-3-months",
      "3-plus-months",
      "flexible",
    ])
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project")
    .max(5000, "Message must be 5000 characters or less"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;