import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { SEASONS_V1 } from "src/http/ergast/endpoints";
import { SeasonsResponse } from "./models";
import { mapSeasonsFromSource } from "./utils/mapSeasonsFromSource";

@Injectable({})
export class SeasonsService {
  private readonly logger = new Logger(SeasonsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getDriversStandingsCurrent(): Promise<SeasonsResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(SEASONS_V1).pipe(
        catchError((error) => {
          this.logger.error(error.response);
          throw 'An error happened!';
        }),
      ),
    );

    return mapSeasonsFromSource(data)
  }
}