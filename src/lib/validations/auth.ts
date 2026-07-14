import { z } from "zod";

// Zod schema for client-side registration form validation
export const registerSchema = z
  .object({
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters.")
      .trim(),
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters.")
      .max(50, "Full name must not exceed 50 characters.")
      .regex(/^[a-zA-Z\s]+$/, "Full name must contain only alphabets and spaces.")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email.")
      .trim(),
    phone: z
      .string()
      .optional()
      .refine((val) => {
        if (!val || val.trim() === "") return true;
        // Accept optional leading plus (+) for country code, then only digits (rejects alphabets)
        return /^\+?[0-9]+$/.test(val.trim());
      }, "Phone number must contain only digits and an optional country code (+)."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
    businessType: z.string().min(1, "Please select your business type."),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions and Privacy Policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Use z.input to extract the form input type for React Hook Form
export type RegisterInput = z.input<typeof registerSchema>;
