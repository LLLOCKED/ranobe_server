import { Ranobe } from ".prisma/client";

export class CreateRanobeDto {
    title: string;
    description: string;
    categories: string[];
}