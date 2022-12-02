import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { catchError, firstValueFrom } from "rxjs";
import { CURRENT_STANDINGS } from "src/http/ergast/endpoints";
import { ErgastXmlResponse } from "src/http/ergast/models/ErgastXmlResponse"
import { ErgastStandings } from "src/http/ergast/models/ErgastStandings"

const options = {
  ignoreAttributes: false,
};

export interface DriverStanding {
  position: number
  points: number
  wins: number
  driver: {
    id: string
    code: string
    url: string
    number: number
    firstName: string
    lastName: string
    dateOfBirth: string
    nationality: string
  }
  constructor: {
    id: string
    url: string
    name: string
    nationality: string
  }
}

const parser = new XMLParser(options);

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

    const parsedStandings: ErgastXmlResponse<ErgastStandings> = parser.parse(data)

    return parsedStandings.MRData.StandingsTable.StandingsList.DriverStanding.map((standing) => {

      return {
        position: Number(standing["@_position"]),
        points: Number(standing["@_position"]),
        wins: Number(standing["@_position"]),
        driver: {
          id: standing.Driver["@_driverId"],
          code: standing.Driver["@_code"],
          url: standing.Driver["@_url"],
          number: standing.Driver.PermanentNumber,
          firstName: standing.Driver.GivenName,
          lastName: standing.Driver.FamilyName,
          dateOfBirth: standing.Driver.DateOfBirth,
          nationality: standing.Driver.Nationality,
        },
        constructor: {
          id: standing.Constructor["@_constructorId"],
          url: standing.Constructor["@_url"],
          name: standing.Constructor.Name,
          nationality: standing.Constructor.Nationality,
        }
      }
    })
  }
}