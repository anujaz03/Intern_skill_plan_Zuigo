import { NextResponse } from "next/server";
import { ApiResponse } from "@/types";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "./constants";

/**
 * Sends a structured standard success JSON response.
 */
export function successResponse<T>(
  data: T,
  message: string = RESPONSE_MESSAGES.SUCCESS,
  status: number = HTTP_STATUS.OK
): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * Sends a structured standard error JSON response.
 */
export function errorResponse(
  message: string,
  status: number = HTTP_STATUS.BAD_REQUEST,
  errors?: string[] | Record<string, string>
): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}

/**
 * Sends a standard structured validation error JSON response (422 Unprocessable Entity).
 */
export function validationErrorResponse(
  errors: Record<string, string> | string[],
  message: string = "Validation constraints failed."
): NextResponse<ApiResponse> {
  return errorResponse(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, errors);
}

/**
 * Sends a standard structured internal server error JSON response (500 Internal Server Error)
 * and logs the system error trace safely.
 */
export function serverErrorResponse(
  error?: unknown,
  message: string = RESPONSE_MESSAGES.SERVER_ERROR
): NextResponse<ApiResponse> {
  if (error) {
    console.error("[Server Error Log Trace]:", error);
  }
  return errorResponse(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
}
