import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthResponse } from "./dto/auth-response.dto";
import {AuthGuard} from "@nestjs/passport";
import AuthUser from "../common/decorators/auth-user.decorator";
import {User} from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post("login")
  login(@Body() data: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
