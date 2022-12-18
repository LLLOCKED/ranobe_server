import { Injectable, UploadedFile } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Ranobe, Prisma } from "@prisma/client";

@Injectable()
export class RanobeService {
  constructor(private prisma: PrismaService) { }

  async ranobe(
    ranobeWhereUniqueInput: Prisma.RanobeWhereUniqueInput
  ): Promise<Ranobe | null> {
    return this.prisma.ranobe.findUnique({
      where: ranobeWhereUniqueInput,
      include: {
        categories: {
          select: {
            name: true
          }
        }
      }
    });
  }

  async ranobes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RanobeWhereUniqueInput;
    where?: Prisma.RanobeWhereInput;
    orderBy?: Prisma.RanobeOrderByWithRelationInput;
  }): Promise<Ranobe[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.ranobe.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createRanobe(
    data: Prisma.RanobeCreateInput
  ): Promise<{ message: string }> {
    await this.prisma.ranobe.create({
      data
    });

    return { message: "Ranobe add" };
  }

  async ranobesByUser(name: string): Promise<Ranobe[] | null> {
    return this.prisma.user
      .findUnique({
        where: { name: name }
        // @ts-ignore
      })
      .ranobes({});
  }
}
