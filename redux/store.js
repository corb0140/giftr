import { configureStore } from "@reduxjs/toolkit";

import ideaReducer from "./slices/ideaSlice";
import personReducer from "./slices/personSlice";

export const store = configureStore({
  reducer: {
    ideas: ideaReducer,
    people: personReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
