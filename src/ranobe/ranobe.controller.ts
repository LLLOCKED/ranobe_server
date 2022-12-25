import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { RanobeService } from "./ranobe.service";
import { Prisma, Ranobe as RanobeModel, User } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { SampleDto } from "./ranobe.dto";
import { diskStorage } from "multer";
import e from "express";
import path = require("path");
import { of } from "rxjs";
import { AuthGuard } from "@nestjs/passport";
import { CreateRanobeDto } from "./dto/create-ranobe.dto";
import AuthUser from "../auth/decorators/auth-user.decorator";
import { UserIsAuthorGuard } from "src/chapters/guards/user-is-author.guard";

@Controller("ranobes")
export class RanobeController {
  constructor(private readonly ranobeService: RanobeService) {}

  @Get(":id")
  async getRanobeById(@Param("id") id: string): Promise<RanobeModel | null> {
    return this.ranobeService.ranobe({ id: id });
  }

  @Get("user/:name")
  async getRanobesByUser(
    @Param("name") name: string
  ): Promise<RanobeModel[] | null> {
    return this.ranobeService.ranobesByUser(name);
  }

  @Get()
  async getRanobes(
    @Query("take") take: number,
    @Query("skip") skip: number,
    @Query("orderByUpdated") orderByUpdated: Prisma.SortOrder | undefined,
    @Query("orderByCreated") orderByCreated: Prisma.SortOrder | undefined
  ): Promise<RanobeModel[]> {
    const created = orderByCreated ? { createdAt: orderByCreated } : "";
    const updated = orderByUpdated ? { updatedAt: orderByUpdated } : "";

    return this.ranobeService.ranobes({
      where: { published: false },
      take: Number(take),
      skip: isNaN(Number(skip)) ? undefined : Number(skip),
      orderBy: { ...created, ...updated }
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
  async createRanobeByUser(
    @AuthUser() user: User,
    @Body() data: CreateRanobeDto
  ) {
    const { title, description, categories } = data;
    const category: any[] = [];
    categories.map(id => category.push({ id: id }));
    return this.ranobeService.createRanobe({
      title,
      description,
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

  @UseGuards(AuthGuard("jwt"), UserIsAuthorGuard)
  @Delete(":id")
  async deleteRanobe(@Param("id") id: string):Promise<RanobeModel>{
    return this.ranobeService.deleteRanobe(id);
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/novel-images",
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void
        ) {
          const filename: string = path
            .parse(file.originalname)
            .name.replace(/\s/g, "");
          const extension: string = path.parse(file.originalname).ext;

          callback(null, `${filename}${extension}`);
        }
      })
    })
  )
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: "jpeg" })
        ]
      })
    )
    file: Express.Multer.File
  ) {
    return of({ imagePath: file.path });
  }
}
