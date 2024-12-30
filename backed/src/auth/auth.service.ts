import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Resend } from 'resend';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import {
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '../exception/custom-exception';

@Injectable()
export class AuthService {
  private resend: Resend;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async register(email: string, password: string) {
    // 检查邮箱是否已存在
    const existingUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new ValidationException('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      throw new ValidationException('注册失败，请稍后重试');
    }
  }

  async sendVerificationCode(email: string) {
    const code = Math.random().toString().slice(2, 8);

    const existCode = await this.prisma.verificationCode.findUnique({
      where: { email },
    });

    // 如果存在验证码记录
    if (existCode && existCode.expiresAt) {
      // 如果验证码未过期，直接返回已存在的验证码
      if (existCode.expiresAt > new Date()) {
        return {
          message: '验证码未过期',
          verificationCode: existCode.code,
        };
      }
      // 如果验证码已过期，删除旧记录
      await this.prisma.verificationCode.delete({
        where: { email },
      });
    }

    // 存储验证码（使用Redis更好）
    await this.prisma.verificationCode.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 3 * 60 * 1000), // 3分钟有效期
      },
    });

    // 发送验证码邮件
    const res = await this.resend.emails.send({
      from: '739507690@qq.com',
      to: email,
      subject: '登录验证码',
      html: `<p>您的验证码是: ${code}</p>`,
    });
    if (res.error) {
      // throw new ValidationException(
      //   `邮件发送失败，${res.error.name}: ${res.error.message}。验证码是：${code}`,
      // );
      return {
        verificationCode: code,
      };
    }
  }

  async removeVerificationCode(email: string) {
    const verificationCode = await this.prisma.verificationCode.findUnique({
      where: { email },
    });

    if (verificationCode && verificationCode.code) {
      await this.prisma.verificationCode.delete({
        where: { email },
      });
    }
    return;
  }

  async login(email: string, password: string, code: string, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密码无效');
    }

    // 验证验证码
    const validCode = await this.prisma.verificationCode.findUnique({
      where: {
        email,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!validCode) {
      throw new ValidationException('验证码无效或已过期');
    }

    // 生成token
    const token = this.jwtService.sign({ userId: user.id });
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '7d' },
    );

    // 保存用户信息到 session
    req.session.user = user as any;

    return {
      token,
      refreshToken,
      userInfo: user,
    };
  }

  async resetPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const currentEmail = email + code;
    // 存储重置密码验证码
    await this.prisma.verificationCode.create({
      data: {
        email: currentEmail,
        code,
        expiresAt: new Date(Date.now() + 3 * 60 * 1000), // 3分钟有效期
      },
    });

    // 发送重置密码验证码邮件
    const res = await this.resend.emails.send({
      from: '739507690@qq.com',
      to: email,
      subject: '重置密码验证码',
      html: `<p>您的重置密码验证码是: ${code}</p>`,
    });
    if (res.error) {
      throw new ValidationException(
        `邮件发送失败，${res.error.name}: ${res.error.message}。验证码是：${code}`,
      );
    }
  }

  async confirmResetPassword(email: string, code: string, newPassword: string) {
    const currentEmail = email + code;

    // 验证验证码
    const validCode = await this.prisma.verificationCode.findFirst({
      where: {
        email: currentEmail,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!validCode) {
      throw new ValidationException('验证码无效或已过期');
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新用户密码
    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // 删除验证码记录
    await this.prisma.verificationCode.delete({
      where: { email: currentEmail },
    });

    return {
      message: '密码修改成功',
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const token = this.jwtService.sign({ userId: payload.userId });
      return { token };
    } catch {
      throw new UnauthorizedException('刷新令牌无效或已过期');
    }
  }
}
