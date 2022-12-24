import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthLoginResponse, AuthRegResponse } from "./dto/auth-response.dto";
import {compare, hashSync} from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(data: CreateUserDto): Promise<AuthRegResponse> {
    const { email, password, name } = data;

    const isUser = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (isUser) {
      throw new ConflictException("user exist");
    }

    const hash = hashSync(password, 10);


    const user = await this.prismaService.user.create({
      // @ts-ignore
      data: {
        email: email, name: name, password: hash
      }
    });

    return {
      message: "User registered"
    };
  }

  async login(
    data: LoginUserDto,
    response: Response
  ): Promise<AuthLoginResponse> {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException("invalid password");
    }

    const token = this.jwtService.sign({ email });

    response.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 1800000) });
    response.cookie("logged_in", true , { expires: new Date(Date.now() + 1800000)});

    return {
      token: token,
      message: "User logined"
    };
  }
}
