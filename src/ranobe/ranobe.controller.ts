import { Controller, Get, Param } from "@nestjs/common";
import { RanobeService } from "./ranobe.service";
import { Ranobe as RanobeModel } from "@prisma/client";

@Controller("ranobe")
export class RanobeController {
  constructor(private readonly ranobeService: RanobeService) {
  }

  @Get("/:id")
  async getRanobeById(@Param("id") id: string): Promise<RanobeModel | null> {
    return this.ranobeService.ranobe({ id: id });
  }

  @Get("feed")
  async getAllRanobes(): Promise<RanobeModel[]> {
    return this.ranobeService.ranobes({ where: { published: true } });
  }

  @Get('search/:searchString')
  async getFilteredRanobes(
    @Param('searchString') searchString: string,
  ): Promise<RanobeModel[]> {
    return this.ranobeService.ranobes({
      where: {
        OR: [
          {
            title: { contains: searchString, mode: 'insensitive', },
          },
          {
            description: { contains: searchString, mode: 'insensitive', },
          },
        ],
      },
    });
  }
}
