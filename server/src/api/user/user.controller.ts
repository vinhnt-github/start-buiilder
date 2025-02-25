import { IsPublic } from '@/core/decorator/public.decorator';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PostUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@IsPublic()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(@Query() q: { email: string }) {
    return this.userService.getAll(q);
  }

  @Post()
  async createUser(@Body() userDto: PostUserDto) {
    try {
      const insertRecord = await this.userService.create(userDto);
      return insertRecord;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
