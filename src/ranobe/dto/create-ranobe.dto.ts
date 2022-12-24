import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateRanobeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    categories: string[];
}