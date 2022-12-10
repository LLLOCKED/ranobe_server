import {Body, Controller, Get, Post, Res, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import {AuthLoginResponse, AuthRegResponse} from "./dto/auth-response.dto";
import {AuthGuard} from "@nestjs/passport";
import AuthUser from "../common/decorators/auth-user.decorator";
import {User} from "@prisma/client";
import {Response} from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() data: CreateUserDto): Promise<AuthRegResponse> {
    return this.authService.register(data);
  }

  @Post("login")
  login(@Body() data: LoginUserDto, @Res({passthrough: true}) response: Response): Promise<AuthLoginResponse> {
    return this.authService.login(data, response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
