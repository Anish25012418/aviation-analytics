import {configureStore} from "@reduxjs/toolkit";
import airportReducer from "./airportSlice.ts";
import airlineReducer from "./airlinesSlice.ts";
import flightReducer from "./flightSlice.ts";

export const store = configureStore({
  reducer: {
    airports: airportReducer,
    airlines: airlineReducer,
    flights: flightReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;