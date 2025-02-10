import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DatabaseExceptionFilter } from './database-exception.filter';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private databaseFilter = new DatabaseExceptionFilter();
  catch(exception: any, host: ArgumentsHost) {
    if (exception.cause && exception.cause.code) {
      // Assuming database exceptions have a code property
      this.databaseFilter.catch(exception.cause, host); // Delegate to DatabaseExceptionFilter
    } else {
      const response = host.switchToHttp().getResponse();
      const exceptionsResponse = exception.getResponse
        ? exception.getResponse()
        : exception;
      return response.json(exceptionsResponse);
    }
  }
}
