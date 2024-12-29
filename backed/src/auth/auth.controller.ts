import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('send-code')
  async sendCode(@Body() body: { email: string }) {
    return this.authService.sendVerificationCode(body.email);
  }

  @Post('remove-code')
  async removeCode(@Body() body: { email: string }) {
    return this.authService.removeVerificationCode(body.email);
  }

  @Post('login')
  async login(@Body() body: { email: string; code: string }, @Request() req) {
    return this.authService.login(body.email, body.code, req);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
