import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RanobeModule } from './ranobe/ranobe.module';
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RanobeModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
