import { Module } from "@nestjs/common";
import { RanobeModule } from "./ranobe/ranobe.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';

@Module({
  imports: [RanobeModule, PrismaModule, UsersModule, AuthModule, ],
  controllers: [],
  providers: []
})
export class AppModule {}
