import { ErgastSeason, ErgastSeasons } from "src/http/ergast/models/ErgastSeasons"
import { ErgastXmlResponse } from "src/http/ergast/models/ErgastXmlResponse"
import { xmlParser } from "src/utils"
import { SeasonsResponse } from "../models"

const sortSeasonDescending = (a: ErgastSeason, b: ErgastSeason) => a["#text"] < b["#text"] ? 1 : -1

export const mapSeasonsFromSource = (source: string): SeasonsResponse => {
  const { MRData }: ErgastXmlResponse<ErgastSeasons> = xmlParser.parse(source)

  return {
    seasons: MRData.SeasonTable.Season.sort(sortSeasonDescending).map((season) => ({
      year: season["#text"]
    }))
  }
}