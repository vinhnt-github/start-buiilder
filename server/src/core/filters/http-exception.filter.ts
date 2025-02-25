import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DatabaseExceptionFilter } from './database-exception.filter';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private databaseFilter = new DatabaseExceptionFilter();
  catch(exception: any, host: ArgumentsHost) {
    if (exception.cause && exception.cause.code) {
      // Assuming database exceptions have a code property
      this.databaseFilter.catch(exception.cause, host); // Delegate to DatabaseExceptionFilter
    } else {
      const ctx = host.switchToHttp();
      const response = host.switchToHttp().getResponse();
      const request = ctx.getRequest<Request>();
      if (exception instanceof UnauthorizedException) {
        return response.status(401).json({
          statusCode: 401,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Unauthorized',
        });
      }
      const exceptionsResponse = exception.getResponse
        ? exception.getResponse()
        : exception;
      return response.json(exceptionsResponse);
    }
  }
}
