import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const exceptionsResponse = exception.getResponse
      ? exception.getResponse()
      : exception;
    return response.json(exceptionsResponse);
  }
}
