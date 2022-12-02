import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async getOneUser(@Param("id") id: string): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    role: "USER" | "ADMIN";
  }> {
    return this.usersService.getUser({ id: id });
  }
}
