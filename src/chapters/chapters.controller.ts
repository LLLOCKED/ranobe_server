import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ChaptersService } from "./chapters.service";
import { Chapter as ChapterModel, User } from "@prisma/client";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { AuthGuard } from "@nestjs/passport";
import AuthUser from "src/auth/decorators/auth-user.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserIsAuthorGuard } from "./guards/user-is-author.guard";

@Controller("chapters")
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get(":id")
  async getChapter(@Param("id") id: string): Promise<ChapterModel | null> {
    return this.chaptersService.chapter({ id: id });
  }

  @Get("")
  async getChapters(): Promise<ChapterModel[]> {
    return this.chaptersService.chapters({ where: { published: true } });
  }

  @Get("ranobe/:id")
  async getChaptersByRanobe(@Param("id") id: string): Promise<ChapterModel[]> {
    return this.chaptersService.chapters({ where: { published: false, ranobeId: id } });
  }

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async createChapter(
    @AuthUser() user: User,
    @Body() chapterData: CreateChapterDto
  ): Promise<ChapterModel> {
    const { title, volume, number, text, ranobe } = chapterData;
    return this.chaptersService.createChapter({
      title,
      volume,
      number,
      text,
      author: {connect: {id: user.id}},
      ranobe: {connect: {id: ranobe}}
    });
  }

  @Roles('USER')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Put('publish/:id')
  async publishChapter(@Param('id') id: string): Promise<ChapterModel> {
    return this.chaptersService.updateChapter({
      where: { id: id },
      data: { published: true },
    });
  }

  @UseGuards(AuthGuard("jwt"), UserIsAuthorGuard)
  @Delete(":id")
  async deleteChapter(@Param("id") id: string):Promise<ChapterModel>{
    return this.chaptersService.deleteChapter(id);
  }
}
