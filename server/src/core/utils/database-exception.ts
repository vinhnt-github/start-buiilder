import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  private error: any;
  constructor(message: string, status: HttpStatus, error: any) {
    super(message, status); // Call the parent HttpException constructor
    this.error = error;
  }
}
