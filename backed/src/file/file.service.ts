import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { existsSync, unlinkSync } from 'fs';
import { File } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: File) {
    const res = await this.prisma.file.create({
      data: file,
    });

    return res;
  }

  async deleteFile(id: string) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('File not found');

    if (existsSync(file.path)) {
      unlinkSync(file.path);
    }

    return this.prisma.file.delete({ where: { id } });
  }

  async getFile(id: string) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async getFiles() {
    return this.prisma.file.findMany();
  }
}
