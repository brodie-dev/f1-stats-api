const ERGAST_API_HOST = "https://ergast.com";

export const SEASONS_V1 = `${ERGAST_API_HOST}/api/f1/seasons?limit=150&offset=0`

export const CURRENT_STANDINGS_V1 = `${ERGAST_API_HOST}/api/f1/current/driverStandings`

export const SEASON_STANDINGS_V1 = (season: string) => `${ERGAST_API_HOST}/api/f1/${season}/driverStandings`
