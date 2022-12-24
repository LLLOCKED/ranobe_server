import { createParamDecorator, ExecutionContext} from "@nestjs/common";
import { User } from ".prisma/client";

const AuthUser = createParamDecorator((_, ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    const clearUser = {id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, role: user.role}
    return clearUser;
}) 

export default AuthUser;