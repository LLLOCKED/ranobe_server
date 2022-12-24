import { Module } from "@nestjs/common";
import { RanobeModule } from "./ranobe/ranobe.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { ChaptersModule } from './chapters/chapters.module';



@Module({
  imports: [RanobeModule, PrismaModule, UsersModule, AuthModule, ChaptersModule, ConfigModule.forRoot(), ChaptersModule ],
  controllers: [],
  providers: [
  ]
})
export class AppModule {}
