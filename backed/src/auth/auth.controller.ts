import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户鉴权')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @ApiOperation({ summary: '登录' })
  @Post('login')
  async login(
    @Body() body: { email: string; password: string; code: string },
    @Request() req,
  ) {
    return this.authService.login(body.email, body.password, body.code, req);
  }

  @ApiOperation({ summary: '忘记密码' })
  @Post('reset')
  async reset(@Body() body: { email: string }) {
    return this.authService.resetPassword(body.email);
  }

  @ApiOperation({ summary: '获取验证码' })
  @Post('send-code')
  async sendCode(@Body() body: { email: string }) {
    return this.authService.sendVerificationCode(body.email);
  }

  @ApiOperation({ summary: '验证验证码' })
  @Post('confirm-code')
  async confirm(
    @Body() body: { email: string; code: string; newPassword: string },
  ) {
    return this.authService.confirmResetPassword(
      body.email,
      body.code,
      body.newPassword,
    );
  }

  @ApiOperation({ summary: '删除验证码' })
  @Post('remove-code')
  async removeCode(@Body() body: { email: string }) {
    return this.authService.removeVerificationCode(body.email);
  }

  @ApiOperation({ summary: '刷新token' })
  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
