import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';

@Module({
  imports: [HttpModule],
  controllers: [SeasonsController],
  providers: [SeasonsService]
})
export class SeasonsModule {}
