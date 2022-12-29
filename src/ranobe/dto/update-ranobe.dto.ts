import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateRanobeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    // @IsArray()
    // categories: string[];
}