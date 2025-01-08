import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Res,
  Body,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import { join } from 'path';
import { File } from '@prisma/client';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  async uploadFile(@Body() file: File) {
    return this.fileService.uploadFile(file);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return this.fileService.deleteFile(id);
  }

  @Get(':id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileService.getFile(id);
    res.sendFile(join(process.cwd(), file.path));
  }

  @Get()
  async getFiles() {
    return this.fileService.getFiles();
  }
}
