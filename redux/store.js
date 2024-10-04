import { configureStore } from "@reduxjs/toolkit";

import personReducer from "./slices/personSlice";

export const store = configureStore({
  reducer: {
    people: personReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
