import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FileController],
  imports: [PrismaModule],
  providers: [FileService, PrismaService],
})
export class FileModule {}
