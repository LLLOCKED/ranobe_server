import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService],
  imports: [PrismaModule],
})
export class ChaptersModule {}
