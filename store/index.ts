import { configureStore } from "@reduxjs/toolkit";

import timeInAppReducer from "./timeInAppSlice";

export const store = configureStore({
  reducer: {
    timeInApp: timeInAppReducer,
  },
});

// Export types from our store.
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
