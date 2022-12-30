import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { CURRENT_STANDINGS_V1, SEASONS_V1, SEASON_STANDINGS_V1 } from "src/http/ergast/endpoints";
import { DriverStandingResponse } from "./models";
import { mapDriversStandingsFromSource } from "./utils/mapDriversStandingsFromSource";

@Injectable({})
export class StandingsService {
  private readonly logger = new Logger(StandingsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getDriversStandingsCurrent(): Promise<DriverStandingResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(CURRENT_STANDINGS_V1).pipe(
        catchError((error) => {
          this.logger.error(error.response);
          throw 'An error happened!';
        }),
      ),
    );

    return mapDriversStandingsFromSource(data)
  }

  async getDriversStandingsBySeason(season: string): Promise<DriverStandingResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(SEASON_STANDINGS_V1(season)).pipe(
        catchError((error) => {
          this.logger.error(error.response);
          throw 'An error happened!';
        }),
      ),
    );

    return mapDriversStandingsFromSource(data)
  }
}