export interface Flight {
  flight_date: string,
  flight_status: "active" | "scheduled" | "landed" | "",
  departure: {
    airport: string,
    timezone: string,
    iata: string,
    icao: string,
    scheduled: string,
    estimated: string,
    actual: string | null,
  },
  arrival: {
    airport: string,
    timezone: string,
    iata: string,
    icao: string,
    scheduled: string,
    estimated: string,
    actual: string | null,
  },
  airline: {
    name: string,
    iata: string,
    icao: string,
  },
  flight: {
    number: string,
    iata: string,
    icao: string,
  }
}