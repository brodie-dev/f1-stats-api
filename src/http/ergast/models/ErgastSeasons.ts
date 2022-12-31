export interface ErgastSeason {
  "#text": number
  "@_url": string
}

export interface ErgastSeasons {
  "SeasonTable": {
    Season: ErgastSeason[]
  }
  "@_limit": string
	"@_offset": string
	"@_total": string
}