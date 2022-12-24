import { IsNumber, IsString, Length } from "class-validator";

export class CreateChapterDto{
    @IsString()
    @Length(3, 255)
    title: string;

    @IsNumber()
    volume: number;

    @IsNumber()
    number: number;

    @IsString()
    text: string;

    @IsString()
    ranobe: string;
}