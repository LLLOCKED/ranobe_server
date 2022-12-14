import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";

import { RanobeService } from "./ranobe.service";
import { FileService, FileType } from "src/file/file.service";

import { Prisma, Ranobe as RanobeModel, Category as CategoryModel,  User } from "@prisma/client";

import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { CreateRanobeDto } from "./dto/create-ranobe.dto";
import AuthUser from "../auth/decorators/auth-user.decorator";
import { UserIsAuthorGuard } from "src/chapters/guards/user-is-author.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UpdateRanobeDto } from "./dto/update-ranobe.dto";

@Controller("ranobes")
export class RanobeController {
  constructor(
    private readonly ranobeService: RanobeService,
    private fileService: FileService
  ) {}

  @Get("/:id")
  async getRanobeById(@Param("id") id: string): Promise<RanobeModel | null> {
    return this.ranobeService.ranobe({ id: id });
  }

  @Get("/categories/list")
  async getAllCategories(): Promise<{id: string, value: string, name: string}[]> {
    return this.ranobeService.categories();
  }

  @Get("user/:name")
  async getRanobesByName(
    @Param("name") name: string
  ): Promise<RanobeModel[] | null> {
    return this.ranobeService.ranobesByUser(name);
  }

  @Get("/my/list")
  @UseGuards(AuthGuard("jwt"), UserIsAuthorGuard)
  async getRanobesByUser(
    @AuthUser() user: User
  ): Promise<RanobeModel[] | null> {
    return this.ranobeService.ranobes({
      where: { authorId: user.id },
      orderBy: {createdAt: 'desc'}
    });
  }

  @Get("/notpublished/list")
  @Roles("ADMIN")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  async getNotPublishedRanobes(): Promise<RanobeModel[] | null> {
    return this.ranobeService.ranobes({
      where: { published: false },
      orderBy: {createdAt: 'desc'}
    });
  }

  @Get()
  async getRanobes(
    @Query("take") take: number,
    @Query("skip") skip: number,
    @Query("orderByUpdated") orderByUpdated: Prisma.SortOrder | undefined,
    @Query("orderByCreated") orderByCreated: Prisma.SortOrder | undefined,
    @Query("orderByViews") orderByViews: Prisma.SortOrder | undefined
  ): Promise<RanobeModel[]> {
    const created = orderByCreated ? { createdAt: orderByCreated } : "";
    const updated = orderByUpdated ? { updatedAt: orderByUpdated } : "";
    const views = orderByViews ? { views: orderByViews } : "";

    return this.ranobeService.ranobes({
      where: { published: true },
      take: Number(take),
      skip: isNaN(Number(skip)) ? undefined : Number(skip),
      orderBy: { ...created, ...updated, ...views }
    });
  }

  @Get("search/:searchString")
  async getFilteredRanobes(
    @Param("searchString") searchString: string
  ): Promise<RanobeModel[]> {
    return this.ranobeService.ranobes({
      where: {
        OR: [
          {
            title: { contains: searchString, mode: "insensitive" }
          },
          {
            description: { contains: searchString, mode: "insensitive" }
          }
        ]
      }
    });
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("image"))
  async createRanobeByUser(
    @AuthUser() user: User,
    @Body() data: CreateRanobeDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    const { title, description, categories } = data;

    const category: { value: string }[] = [];

    //FIXME: when one category - error  (not array)
    categories.map(value => category.push({ value: value}));

    const imagePath = this.fileService.createImage(FileType.IMAGE, image);

    return this.ranobeService.createRanobe({
      title,
      description,
      image: imagePath,
      // @ts-ignore
      categories: { connect: category },
      author: { connect: { id: user.id } }
    });
  }

  @UseGuards(AuthGuard("jwt"), UserIsAuthorGuard)
  @Put("publish/:id")
  async publishRanobe(@Param("id") id: string): Promise<RanobeModel> {
    return this.ranobeService.updateRanobe({
      where: { id: id },
      data: { published: true }
    });
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"), UserIsAuthorGuard)
  async uptatedRanobe(@Param("id") id: string, @Body() data: UpdateRanobeDto): Promise<RanobeModel>{
      return this.ranobeService.updateRanobe({
        data: {title: data.title, description: data.description},
        where: {id: id}
      })
  }

  @UseGuards(AuthGuard("jwt"), UserIsAuthorGuard)
  @Delete(":id")
  async deleteRanobe(@Param("id") id: string): Promise<RanobeModel> {
    const ranobe = await this.ranobeService.deleteRanobe(id);
    this.fileService.removeImage(FileType.IMAGE, ranobe.image);
    return ranobe;
  }
}
