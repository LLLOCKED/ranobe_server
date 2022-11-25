import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RanobeModule } from './ranobe/ranobe.module';

@Module({
  imports: [RanobeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
