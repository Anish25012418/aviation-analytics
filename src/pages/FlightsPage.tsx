import {useEffect, useState} from "react";
import {doGetAirports} from "../store/airportSlice.ts";
import {useAppDispatch, useAppSelector} from "../hooks/store/hooks.ts";
import {doGetAirlines} from "../store/airlinesSlice.ts";
import {doGetFlights} from "../store/flightSlice.ts";
import type {SearchParams} from "../types/searchParams.ts";
import type {Flight} from "../types/flight.ts";
import {AutocompleteInput} from "../components/input/AutocompleteInput.tsx";
import {Loader} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {formatDateTime} from "../utility/functions.ts";

const FlightsPage = () => {
  const flights = useAppSelector(state => state.flights.flights);
  const airports = useAppSelector(state => state.airports.airports);
  const airlines = useAppSelector(state => state.airlines.airlines);
  const isLoading = useAppSelector(state => state.flights.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [allFilteredFlights, setAllFilteredFlights] = useState<Flight[]>([]);

  const [filters, setFilters] = useState<SearchParams>({
    date: "",
    dept_airport: "",
    arr_airport: "",
    airline: "",
    flight_no: "",
    status: "",
  });

  //implementing pagination
  const [currentPage, setCurrentPage] = useState(1);

  const flightsPerPage = 10; //10 data per page

  const indexOfLastFlight = currentPage * flightsPerPage; //finding last index of that page
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage; //finding first index of that page
  const currentFlights = allFilteredFlights.slice(indexOfFirstFlight, indexOfLastFlight); //retrieving the data between first and last index calculated above

  const totalPages = Math.ceil(allFilteredFlights.length / flightsPerPage); //Calculation total number of pages


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(doGetAirports());
    dispatch(doGetAirlines());
    dispatch(doGetFlights());
  }, [dispatch]);

  useEffect(() => {
    setAllFilteredFlights(flights);
  }, [flights]);

  useEffect(() => {
    if (!isLoading) return; // if not loading, no timeout needed

    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 5000);

    // cleanup if loading finishes before 10 seconds
    return () => clearTimeout(timeoutId);
  }, [isLoading, navigate]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevState) => ({...prevState, [name]: value}));
  }

  //applying filters acc to input
  const applyFilters = () => {
    const result = flights.filter(flight => {
      return (
        (!filters.date || flight.flight_date === filters.date) &&
        (!filters.flight_no || flight.flight.iata?.toLowerCase().includes(filters.flight_no.toLowerCase())) &&
        (!filters.dept_airport || flight.departure.airport === filters.dept_airport) &&
        (!filters.arr_airport || flight.arrival.airport === filters.arr_airport) &&
        (!filters.airline || flight.airline.name === filters.airline) &&
        (!filters.status || flight.flight_status === filters.status)
      );
    });

    setAllFilteredFlights(result);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      date: "",
      dept_airport: "",
      arr_airport: "",
      airline: "",
      flight_no: "",
      status: "",
    })
    setAllFilteredFlights(flights);
    setCurrentPage(1);
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-indigo-500 animate-spin"/>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Flights Data</h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-4">

          <input
            type="date"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.date ?? ""}
            onChange={(e) => handleFilterChange("date", e.target.value)}
          />


          <AutocompleteInput
            placeholder="Select dept airport"
            value={filters.dept_airport ?? ""}
            onChange={(val) => handleFilterChange("dept_airport", val)}
            options={airports.map(a => a.airport_name)}
          />


          <AutocompleteInput
            placeholder="Select arr airport"
            value={filters.arr_airport ?? ""}
            onChange={(val) => handleFilterChange("arr_airport", val)}
            options={airports.map(a => a.airport_name)}
          />

          <AutocompleteInput
            placeholder="Select airline"
            value={filters.airline ?? ""}
            onChange={(val) => handleFilterChange("airline", val)}
            options={airlines.map(a => a.airline_name)}
          />

          <input
            type="text"
            placeholder="Flight No."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.flight_no ?? ""}
            onChange={(e) => handleFilterChange("flight_no", e.target.value)}
          />

          <select
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="active">In-Air</option>
            <option value="landed">Landed</option>
          </select>

          <button onClick={applyFilters}
                  className="px-5 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm cursor-pointer">
            Search
          </button>

          <button onClick={clearFilters}
                  className="px-5 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm cursor-pointer">
            Clear
          </button>

        </div>

      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-fixed border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="w-[10%] p-3 text-sm font-semibold tracking-wide text-left">Date</th>
            <th className="w-[15%] p-3 text-sm font-semibold tracking-wide text-left">Airline</th>
            <th className="w-[10%] p-3 text-sm font-semibold tracking-wide text-left">Flight</th>
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
                <br/>
                <span className="text-xs text-gray-500">SCH: {formatDateTime(flight.departure.scheduled)}</span>
                <br/>
                <span className="text-xs text-gray-500">EST: {formatDateTime(flight.departure.estimated)}</span>
                <br/>
                <span className="text-xs text-gray-500">ACT: {formatDateTime(flight.departure.actual)}</span>
              </td>

              <td className="p-3 text-sm text-gray-700 whitespace-nowrap leading-5">
                {flight.arrival.airport ?? "N/A"}
                <br/>
                <span className="text-xs text-gray-500">SCH: {formatDateTime(flight.arrival.scheduled)}</span>
                <br/>
                <span className="text-xs text-gray-500">EST: {formatDateTime(flight.arrival.estimated)}</span>
                <br/>
                <span className="text-xs text-gray-500">ACT: {formatDateTime(flight.arrival.actual)}</span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap capitalize">
                {flight.flight_status === "" || !flight.flight_status ? (
                  <span
                    className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">N/A</span>
                ) : flight.flight_status === "landed" ? (
                  <span
                    className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Landed</span>
                ) : flight.flight_status === "scheduled" ? (
                  <span
                    className="p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-800 bg-indigo-200 rounded-lg bg-opacity-50">Scheduled</span>
                ) : (
                  <span
                    className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">In-Air</span>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-1">
        {Array.from({length: totalPages}, (_, index) => {
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