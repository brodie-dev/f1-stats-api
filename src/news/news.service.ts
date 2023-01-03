import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { NEWS_V1 } from "src/http/ergast/endpoints";
import { MediaStackNewsResponse } from "src/http/ergast/models/MediaStackNews";
import { NewsResponse } from "./models";
import { mapSeasonsFromSource } from "./utils/mapNewsFromSource";
import newsMock from "./mocks/newsMock"

@Injectable({})
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getDriversStandingsCurrent(): Promise<NewsResponse> {
    // protects limited quota
    if (process.env.MOCK_NEWS === "true") {
      return mapSeasonsFromSource(newsMock)
    }


    const { data } = await firstValueFrom(
      this.httpService.get<MediaStackNewsResponse>(NEWS_V1).pipe(
        catchError((error) => {
          this.logger.error(error.response);
          throw 'An error happened!';
        }),
      ),
    );

    return mapSeasonsFromSource(data)
  }
}