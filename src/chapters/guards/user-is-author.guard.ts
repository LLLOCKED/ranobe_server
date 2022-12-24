import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { User } from "@prisma/client";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async isAuthor(userID: string, chapterId: string): Promise<boolean>{
    let hasPermission = false;

    const user = await this.prisma.user.findUnique({
      where: { id: userID },
    }).chapter({
      where: {id: chapterId}
    });

    if(user){
      hasPermission = true
    }

    // Logger.log(hasPermission);

    return hasPermission;
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const chapterId: string = params.id;
    const user = request.user as User;

  
    const chapterOfUser = this.isAuthor(user.id, chapterId)

    return chapterOfUser;
  }
}
