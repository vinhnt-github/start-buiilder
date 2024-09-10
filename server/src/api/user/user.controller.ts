import { IsPublic } from '@/core/decorator/public.decorator';
import { TransformInterceptor } from '@/core/interceptors/transform.interceptor';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PostUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @IsPublic()
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
