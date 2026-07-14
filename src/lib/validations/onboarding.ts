import { z } from "zod";

// Step 1: Business Information Schema
export const businessInfoSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .trim(),
  businessType: z.string().min(1, "Please select your business type."),
  industry: z.string().min(1, "Please select your industry."),
  companySize: z.string().min(1, "Please select your company size."),
  businessEmail: z
    .string()
    .min(1, "Business email is required.")
    .email("Please enter a valid email address.")
    .trim(),
  businessPhone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      // Accept only digits for the phone field
      return /^[0-9]+$/.test(val.trim());
    }, "Phone number must contain only digits."),
  companyWebsite: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      // Validate that it resolves as a URL structure
      try {
        const urlStr = val.trim().startsWith("http") ? val.trim() : `https://${val.trim()}`;
        new URL(urlStr);
        return true;
      } catch {
        return false;
      }
    }, "Please enter a valid URL (e.g. example.com)."),
});

export type BusinessInfoInput = z.input<typeof businessInfoSchema>;

// Step 2: Workspace Preferences Schema
export const workspacePrefSchema = z.object({
  country: z.string().min(1, "Please select your country."),
  state: z.string().optional(),
  city: z.string().optional(),
  timeZone: z.string().min(1, "Please select your time zone."),
  preferredCurrency: z.string().min(1, "Please select your preferred currency."),
});

export type WorkspacePrefInput = z.input<typeof workspacePrefSchema>;
