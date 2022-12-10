import { Injectable } from "@nestjs/common";
import { Request as RequestType } from 'express';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { userInfo } from "os";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor (private readonly prismaService:PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJwtFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    private static extractJwtFromCookie(req: RequestType){
        if(req.cookies && 'token' in req.cookies ){
            return req.cookies.token;
        }
        return null;
    }


    async validate(payload: { email:string }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: payload.email
            }
        })

        return user;
    }

}