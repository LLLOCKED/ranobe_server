import { Module } from '@nestjs/common';
import { RanobeController } from './ranobe.controller';
import { RanobeService } from './ranobe.service';
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [RanobeController],
  providers: [RanobeService],
  imports: [PrismaModule],
})
export class RanobeModule {}
