import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { SeasonsModule } from './seasons/seasons.module';
import { StandingsModule } from './standings/standings.module';

@Module({
  imports: [ConfigModule.forRoot(), NewsModule, SeasonsModule, StandingsModule],
})
export class AppModule {}
