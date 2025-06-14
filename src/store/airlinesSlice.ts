import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import type {Pagination} from "../types/pagination.ts";
import type {Airline} from "../types/airline.ts";
import {API_PATHS} from "../utility/apiPaths.ts";
import toast from "react-hot-toast";

interface IStateAirline {
  pagination: Pagination | null,
  airlines: Airline [] | [],
  isLoading: boolean,
  isError: boolean,
}

const initialState: IStateAirline = {
  airlines: [],
  pagination: null,
  isLoading: false,
  isError: false,
}

const doGetAirlines = createAsyncThunk('fetchAirlines',
  async () => {
    try {
      const response = await axios.get(API_PATHS.GET_AIRLINES);
      return response.data;
    }catch (error) {
      toast.error("Unable to retrieve airlines. Try again later.");
      console.error(error)
    }
  }
);

const airlineSlice = createSlice({
  name: "airlines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAirlines.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(doGetAirlines.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.airlines = payload.data;
      state.pagination = payload.pagination;
    });
    builder.addCase(doGetAirlines.rejected, (state, action) => {
      console.error("Error", action.payload);
      state.isError = true;
    })
  }
});

export default airlineSlice.reducer;
export {doGetAirlines};