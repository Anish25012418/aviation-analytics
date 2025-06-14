import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import type {Pagination} from "../types/pagination.ts";
import type {Flight} from "../types/flight.ts";
import {API_PATHS} from "../utility/apiPaths.ts";
import toast from "react-hot-toast";

interface IStateFlight {
  pagination: Pagination | null,
  flights: Flight [] | [],
  isLoading: boolean,
  isError: boolean,
}

const initialState: IStateFlight = {
  flights: [],
  pagination: null,
  isLoading: false,
  isError: false,
}

const doGetFlights = createAsyncThunk('fetchFlights',
  async () => {
    try {
      const response = await axios.get(API_PATHS.GET_FLIGHTS);
      return response.data;
    }catch (error) {
      toast.error("Unable to retrieve flights. Try again later.");
      console.error(error)
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetFlights.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(doGetFlights.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.flights = payload.data;
      state.pagination = payload.pagination;
    });
    builder.addCase(doGetFlights.rejected, (state, action) => {
      console.error("Error", action.payload);
      state.isError = true;
    })
  }
});

export default flightSlice.reducer;
export {doGetFlights};