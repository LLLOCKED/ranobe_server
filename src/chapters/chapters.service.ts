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
      where: chapterWhereUniqueInput
    });
  }

  chapters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChapterWhereUniqueInput;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput;
  }): Promise<ChapterModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.chapter.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  createChapter(data: Prisma.ChapterCreateInput): Promise<ChapterModel> {
    return this.prisma.chapter.create({
      data
    });
  }

  deleteChapter(id: string): Promise<ChapterModel> {
    Logger.log("chap " + id)
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
