import {IsEmail, IsString, Length} from 'class-validator'

export class CreateUserDto{
    @IsString()
    @Length(3,10)
    name: string;

    @IsString()
    @Length(6,12)
    password: string;

    @IsEmail()
    email: string;

}