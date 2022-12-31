const ERGAST_API_HOST = "https://ergast.com";
const MEDIA_STACK_API_HOST = "http://api.mediastack.com"
const MEDIA_STACK_KEY = process.env.MEDIA_STACK_API_KEY

export const NEWS_V1 = `${MEDIA_STACK_API_HOST}/v1/news?access_key=${MEDIA_STACK_KEY}&keywords=f1&countries=gb&limit=100&sort=published_desc`

export const SEASONS_V1 = `${ERGAST_API_HOST}/api/f1/seasons?limit=150&offset=0`

export const CURRENT_STANDINGS_V1 = `${ERGAST_API_HOST}/api/f1/current/driverStandings`

export const SEASON_STANDINGS_V1 = (season: string) => `${ERGAST_API_HOST}/api/f1/${season}/driverStandings`
