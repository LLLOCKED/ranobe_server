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
    role: string;
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


  async deleteUser(userReq: any):Promise<{message: string}>{

    const deleteUser = await this.prisma.user.delete({
      where: {
        email: userReq.email
      }
    });

    return {message: "User deleted"}
  }
}
