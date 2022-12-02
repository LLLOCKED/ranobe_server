import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User, Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
      userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    role: "USER" | "ADMIN";
  }> {
    const user = await this.prisma.user.findUnique({
      where:  userWhereUniqueInput,
      select: {
        name: true,
        email: true,
        createdAt: true,
        role: true
      }
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, password, name } = data;

    const isUser = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (isUser) {
      throw new HttpException("user_already_exist", HttpStatus.CONFLICT);
    }
    const hashPass = await hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashPass
      }
    });
  }
}
