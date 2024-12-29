import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@ApiTags('成员')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  @ApiOperation({ summary: '获取全部用户' })
  async find() {
    return this.userService.findUser();
  }

  @Get('findByEmail')
  @ApiOperation({ summary: '通过电子邮件创建用户' })
  async findByEmail(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
