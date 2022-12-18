import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { PrismaService } from "../prisma/prisma.service";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30m" }
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
