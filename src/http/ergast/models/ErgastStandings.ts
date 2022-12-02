interface ErgastDriver {
  PermanentNumber: number
  GivenName: string
  FamilyName: string
  DateOfBirth: string
  Nationality: string
  "@_driverId": string
  "@_code": string
  "@_url": string
}

interface ErgastConstructor {
  Name: string
  Nationality: string
  "@_constructorId": string
  "@_url": string
}


interface ErgastStanding {
  Driver: ErgastDriver
  Constructor: ErgastConstructor
  "@_position": string
  "@_positionText": string
  "@_points": string
  "@_wins": string
}

export interface ErgastStandings {
  StandingsTable: {
    StandingsList: {
      DriverStanding: ErgastStanding[]
    }
  }
}