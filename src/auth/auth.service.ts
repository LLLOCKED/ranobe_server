import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthResponse} from "./dto/auth-response.dto";
import {compare} from 'bcrypt';
import {LoginUserDto} from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(data: CreateUserDto): Promise<AuthResponse>{
    const user = await this.usersService.create(data);
    return {
      token: this.jwtService.sign({email: user.email}),
      user
    }
  }

  async login(data:LoginUserDto): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email }
    });

    if(!user) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    return {
      token: this.jwtService.sign({
        email
      }),
      user
    }
  }
}
