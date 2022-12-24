import {Controller, Delete, Get, Param, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import {AuthGuard} from "@nestjs/passport";
import AuthUser from "../auth/decorators/auth-user.decorator";
import {User} from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async getOneUser(@Param("id") id: string): Promise<{
    name: string;
    createdAt: Date;
    role: string;
  }> {
    return this.usersService.getUser({ id: id });
  }

  @Delete("delete")
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@AuthUser() userReq:User):Promise<{message: string}>{
    return this.usersService.deleteUser(userReq);
  }

}
