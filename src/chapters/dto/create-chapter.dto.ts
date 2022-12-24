import { IsNumber, IsString, Length, IsNotEmpty } from "class-validator";

export class CreateChapterDto{
    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    volume: number;

    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsNotEmpty()
    ranobe: string;
}