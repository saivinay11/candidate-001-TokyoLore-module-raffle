/**
 * Error handling utilities for the application
 */

import { NextResponse } from "next/server";

export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

/**
 * Creates a standardized error response for API routes
 * @param error Error object or message
 * @param statusCode HTTP status code (defaults to 500)
 * @returns NextResponse with error details
 */
export function createErrorResponse(
  error: Error | string,
  statusCode = 500
): NextResponse {
  const isApiError = error instanceof ApiError;
  const status = isApiError ? error.statusCode : statusCode;
  const message = typeof error === "string" ? error : error.message;

  const errorResponse: ApiErrorResponse = {
    error: message,
  };

  if (isApiError) {
    if (error.code) errorResponse.code = error.code;
    if (error.details) errorResponse.details = error.details;
  }

  console.error(`API Error [${status}]:`, message);

  return NextResponse.json(errorResponse, { status });
}

/**
 * Creates a standardized success response for API routes
 * @param data Data to include in the response
 * @param statusCode HTTP status code (defaults to 200)
 * @returns NextResponse with the data
 */
export function createSuccessResponse<T>(
  data: T,
  statusCode = 200
): NextResponse {
  return NextResponse.json(data, { status: statusCode });
}
