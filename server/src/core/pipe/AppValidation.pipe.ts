import { HttpException, HttpStatus } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'zod';

export const AppValidationPipe = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: ZodError) =>
    new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        fieldErrors: Object.fromEntries(
          error.issues.map(({ path, message }) => [path[0], message]),
        ),
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: Object.fromEntries(
          error.issues.map(({ path, message }) => [path[0], message]),
        ),
      },
    ),
});
