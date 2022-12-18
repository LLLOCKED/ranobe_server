import { Module } from "@nestjs/common";
import { RanobeModule } from "./ranobe/ranobe.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [RanobeModule, PrismaModule, UsersModule, AuthModule, ConfigModule.forRoot() ],
  controllers: [],
  providers: []
})
export class AppModule {}
