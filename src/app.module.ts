import { Module } from '@nestjs/common';
import { StandingsModule } from './standings/standings.module';

@Module({
  imports: [StandingsModule],
})
export class AppModule {}
