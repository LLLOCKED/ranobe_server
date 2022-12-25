import { Module } from '@nestjs/common';
import { RanobeController } from './ranobe.controller';
import { RanobeService } from './ranobe.service';
import { PrismaModule } from "../prisma/prisma.module";
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [RanobeController],
  providers: [RanobeService, FileService],
  imports: [PrismaModule, FileModule],
})
export class RanobeModule {}
