import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { CURRENT_STANDINGS } from "src/http/ergast/endpoints";
import { DriverStandingResponse } from "./models";
import { mapDriversStandingsFromSource } from "./utils/mapDriversStandingsFromSource";

@Injectable({})
export class StandingsService {
  private readonly logger = new Logger(StandingsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getDriversStandingsCurrent(): Promise<DriverStandingResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(CURRENT_STANDINGS).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return mapDriversStandingsFromSource(data)
  }
}