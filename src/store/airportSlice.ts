import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import type {Pagination} from "../types/pagination.ts";
import type {Airport} from "../types/airport.ts";
import {API_PATHS} from "../utility/apiPaths.ts";

interface IStateAirport {
  pagination: Pagination | null,
  airports: Airport [] | [],
  isLoading: boolean,
  isError: boolean,
}

const initialState: IStateAirport = {
  airports: [],
  pagination: null,
  isLoading: false,
  isError: false,
}

const doGetAirports = createAsyncThunk('fetchAirports',
  async () => {
    try {
      const response = await axios.get(API_PATHS.GET_AIRPORTS);
      return response.data;
    }catch (error) {
      console.error(error)
    }
  }
);

const airportSlice = createSlice({
  name: "airports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAirports.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(doGetAirports.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.airports = payload.data;
      state.pagination = payload.pagination;
    });
    builder.addCase(doGetAirports.rejected, (state, action) => {
      console.error("Error", action.payload);
      state.isError = true;
    })
  }
});

export default airportSlice.reducer;
export {doGetAirports};