// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import spotifyApi from "./spotifyApi.js";
import { api } from "./api";
import authReducer from "./authSlice";

const rootReducer = {
  auth: authReducer,
  [spotifyApi.reducerPath]: spotifyApi.reducer,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware, api.middleware),
});

setupListeners(store.dispatch);

export { store };
