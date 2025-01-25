// store.js
import { configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import orebiReducer from "./orebiSlice";
import dashboardReducer from "./dashboardSlice"; 

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedOrebiReducer = persistReducer(persistConfig, orebiReducer);
const persistedDashboardReducer = persistReducer(persistConfig, dashboardReducer);

export const store = configureStore({
  reducer: {
    orebiReducer: persistedOrebiReducer,
    dashboard: persistedDashboardReducer, // Persist the dashboard reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
