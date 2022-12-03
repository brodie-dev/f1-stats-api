import { ErgastStandings } from "src/http/ergast/models/ErgastStandings"
import { ErgastXmlResponse } from "src/http/ergast/models/ErgastXmlResponse"
import { xmlParser } from "src/utils"
import { DriverStandingResponse } from "../models"

export const mapDriversStandingsFromSource = (source: string): DriverStandingResponse => {
  const { MRData }: ErgastXmlResponse<ErgastStandings> = xmlParser.parse(source)

  return {
    season: MRData.StandingsTable.StandingsList["@_season"],
    round: Number(MRData.StandingsTable.StandingsList["@_round"]),
    standings: MRData.StandingsTable.StandingsList.DriverStanding.map((standing) => ({
      position: Number(standing["@_position"]),
      points: Number(standing["@_points"]),
      wins: Number(standing["@_wins"]),
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
    }))
  }
}