import { Module } from "@nestjs/common";
import { RanobeModule } from "./ranobe/ranobe.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ChaptersModule } from "./chapters/chapters.module";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(
        __dirname,
        '..',
        "static",
      ),
    }),
    RanobeModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    ChaptersModule,
    ConfigModule.forRoot(),
    ChaptersModule,
    FileModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
