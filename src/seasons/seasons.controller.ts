import { Controller, Get, Version } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

    @Version('1')
    @Get("/") 
    getDriversStandingsCurrent() {
      return this.seasonsService.getDriversStandingsCurrent()
    
  }
}