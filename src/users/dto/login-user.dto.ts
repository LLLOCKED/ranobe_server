import {IsEmail, IsString, Length} from 'class-validator'

export class LoginUserDto{
    @IsString()
    @Length(6,12)
    password: string;

    @IsEmail()
    email: string;

}