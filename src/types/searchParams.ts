export interface SearchParams {
  date: string | null,
  dept_airport: string | null,
  arr_airport: string | null,
  airline: string | null,
  flight_no: string | null,
  status: string| "active" | "scheduled" | "landed" | "",
}