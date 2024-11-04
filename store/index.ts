import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import customTopicsReducer from "./customTopicsSlice";
import lettersReducer from "./lettersSlice";
import numbersReducer from "./numbersSlice";
import settingsReducer from "./settingsSlice";
import timeInAppReducer from "./timeInAppSlice";
import voicesReducer from "./voicesSlice";

// Only persist the `settings` slice.
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["settings"],
};
const rootReducer = combineReducers({
  timeInApp: timeInAppReducer,
  settings: settingsReducer,
  numbers: numbersReducer,
  letters: lettersReducer,
  voices: voicesReducer,
  customTopics: customTopicsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

// Export types from our store.
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
