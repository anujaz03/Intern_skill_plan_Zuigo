/**
 * =========================================================================
 * LEADFLOW AI - BACKEND CONSTANTS & MESSAGES
 * =========================================================================
 */

// HTTP Standard status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Database collection names
export const COLLECTIONS = {
  USERS: "User",
} as const;

// Validation error messages
export const VALIDATION_MESSAGES = {
  // User Model Errors
  NAME_REQUIRED: "Full name is required.",
  NAME_MIN_LENGTH: "Full name must be at least 3 characters.",
  
  EMAIL_REQUIRED: "Email address is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  EMAIL_UNIQUE: "This email address is already registered.",

  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters.",
  
  PHONE_DIGITS_ONLY: "Phone number must contain only numeric digits.",

  COMPANY_REQUIRED: "Company name is required.",
  BUSINESS_TYPE_REQUIRED: "Business type is required.",
  INDUSTRY_REQUIRED: "Industry is required.",
  COUNTRY_REQUIRED: "Country selection is required.",
} as const;

// Generic response labels
export const RESPONSE_MESSAGES = {
  SUCCESS: "Request completed successfully.",
  SERVER_ERROR: "An unexpected server error occurred. Please try again.",
  UNAUTHORIZED: "Authentication required.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "Requested resource not found.",
} as const;
