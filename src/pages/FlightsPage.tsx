import {useEffect, useState} from "react";
import {doGetAirports} from "../store/airportSlice.ts";
import {useAppDispatch, useAppSelector} from "../hooks/store/hooks.ts";
import {doGetAirlines} from "../store/airlinesSlice.ts";
import {doGetFlights} from "../store/flightSlice.ts";

const FlightsPage = () => {
  const flights = useAppSelector(state => state.flights.flights);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const totalPages = Math.ceil(flights.length / flightsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    dispatch(doGetAirports());
    dispatch(doGetAirlines());
    dispatch(doGetFlights())
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Flights Data</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-fixed border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="w-[10%] p-3 text-sm font-semibold tracking-wide text-left">Date</th>
            <th className="w-[15%] p-3 text-sm font-semibold tracking-wide text-left">Airline</th>
            <th className="w-[10%] p-3 text-sm font-semibold tracking-wide text-left">Flight No.</th>
            <th className="w-[25%] p-3 text-sm font-semibold tracking-wide text-left">Departure</th>
            <th className="w-[25%] p-3 text-sm font-semibold tracking-wide text-left">Arrival</th>
            <th className="w-[15%] p-3 text-sm font-semibold tracking-wide text-left">Status</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          {currentFlights.map((flight, index) => (
            <tr key={index} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{flight.flight_date ?? "N/A"}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{flight.airline.name ?? "N/A"}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{flight.flight.iata ?? "N/A"}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap leading-5">
                {flight.departure.airport ?? "N/A"}
                <br />
                <span className="text-xs text-gray-500">SCH: {formatDateTime(flight.departure.scheduled)}</span>
                <br />
                <span className="text-xs text-gray-500">EST: {formatDateTime(flight.departure.estimated)}</span>
                <br />
                <span className="text-xs text-gray-500">ACT: {formatDateTime(flight.departure.actual)}</span>
              </td>

              <td className="p-3 text-sm text-gray-700 whitespace-nowrap leading-5">
                {flight.arrival.airport ?? "N/A"}
                <br />
                <span className="text-xs text-gray-500">SCH: {formatDateTime(flight.arrival.scheduled)}</span>
                <br />
                <span className="text-xs text-gray-500">EST: {formatDateTime(flight.arrival.estimated)}</span>
                <br />
                <span className="text-xs text-gray-500">ACT: {formatDateTime(flight.arrival.actual)}</span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap capitalize">
                {flight.flight_status === "" || !flight.flight_status ? (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">N/A</span>
                ) : flight.flight_status === "landed" ? (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Landed</span>
                ) : flight.flight_status === "scheduled" ? (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-800 bg-indigo-200 rounded-lg bg-opacity-50">Scheduled</span>
                ) : (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">In-Air</span>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 text-sm rounded-md border transition duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>

  );
};

export default FlightsPage;