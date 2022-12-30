import { Controller, Get, Param, Version } from "@nestjs/common";
import { StandingsService } from "./standings.service";

@Controller('standings')
export class StandingsController {
  constructor(private readonly standingsService: StandingsService) {}

  @Version('1')
  @Get("current") 
  getDriversStandingsCurrent() {
    return this.standingsService.getDriversStandingsCurrent()
  }

  @Version('1')
  @Get("season/:season") 
  getDriversStandingsBySeason(@Param() params: { season: string }) {
    return this.standingsService.getDriversStandingsBySeason(params.season)
  }
}