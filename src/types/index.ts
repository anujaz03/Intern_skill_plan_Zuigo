/**
 * =========================================================================
 * LEADFLOW AI - GLOBAL TYPES & INTERFACES DEFINITIONS
 * =========================================================================
 */

/**
 * Base User Interface representing the structure of a User document.
 */
export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password?: string; // Optional because we omit password when returning user objects
  phone?: string;
  companyName?: string;
  businessType?: string;
  industry?: string;
  country?: string;
  companySetupCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interface representing standard structured API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[] | Record<string, string>;
}
