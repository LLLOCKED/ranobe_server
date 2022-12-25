import { Injectable, Logger } from "@nestjs/common";
import { Chapter as ChapterModel, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChaptersService {
  constructor(private prisma: PrismaService) {}

  chapter(
    chapterWhereUniqueInput: Prisma.ChapterWhereUniqueInput
  ): Promise<ChapterModel | null> {
    return this.prisma.chapter.findUnique({
      where: chapterWhereUniqueInput,
    });
  }


  // TODO - type promis
  chapters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChapterWhereUniqueInput;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput;
  }): Promise<any> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.chapter.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select:{
        id: true,
        title: true,
        volume: true,
        number: true,
        createdAt: true,
        ranobeId: true,
        authorId: true,
      }
    });
  }

  createChapter(data: Prisma.ChapterCreateInput): Promise<ChapterModel> {
    return this.prisma.chapter.create({
      data
    });
  } 

  deleteChapter(id: string): Promise<ChapterModel> {
    return this.prisma.chapter.delete({
      where: { id: id },
    });
  }

  updateChapter(params: {
    where: Prisma.ChapterWhereUniqueInput;
    data: Prisma.ChapterUpdateInput;
  }): Promise<ChapterModel> {
    const { data, where } = params;
    return this.prisma.chapter.update({
      data,
      where
    });
  }
}
