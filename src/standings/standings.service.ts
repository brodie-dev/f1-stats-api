import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { CURRENT_STANDINGS } from "src/http/ergast/endpoints";
import { DriverStanding } from "./models";
import { mapStandingsFromSource } from "./utils/mapStandingsFromSource";

@Injectable({})
export class StandingsService {
  private readonly logger = new Logger(StandingsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getDriversStandingsCurrent(): Promise<DriverStanding[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(CURRENT_STANDINGS).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return mapStandingsFromSource(data)
  }
}