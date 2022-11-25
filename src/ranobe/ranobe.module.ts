import { Module } from '@nestjs/common';
import { RanobeController } from './ranobe.controller';
import { RanobeService } from './ranobe.service';

@Module({
  controllers: [RanobeController],
  providers: [RanobeService]
})
export class RanobeModule {}
