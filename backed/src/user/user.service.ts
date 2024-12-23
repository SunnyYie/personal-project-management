import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * 用户注册
   * @param data
   * @returns res
   */
  async create(data: User) {
    const res = await this.prisma.user.create({
      data,
    });

    return res;
  }
}
