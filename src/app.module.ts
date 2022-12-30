import { Module } from '@nestjs/common';
import { SeasonsModule } from './seasons/seasons.module';
import { StandingsModule } from './standings/standings.module';

@Module({
  imports: [SeasonsModule, StandingsModule],
})
export class AppModule {}
