// filters/database-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    // Handle Drizzle and PostgreSQL-specific errors:
    // Example for PostgreSQL unique violation error (code 23505)
    if (exception.code === '23505') {
      status = HttpStatus.CONFLICT; // Correct usage: accessing the constant, not calling it
      message = 'Duplicate entry found. A unique constraint was violated.';
    }
    // Example for PostgreSQL foreign key violation error (code 23503)
    else if (exception.code === '23503') {
      status = HttpStatus.BAD_REQUEST; // Correct usage: accessing the constant
      message = 'Invalid foreign key reference.';
    }
    // Handle generic database errors (for Drizzle)
    else if (exception.message && exception.message.includes('drizzle')) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'A Drizzle ORM error occurred during the database operation.';
    }
    // For unhandled exceptions
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'An internal server error occurred.';
    }

    // Send the error response
    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
