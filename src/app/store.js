// store.js
import { configureStore } from "@reduxjs/toolkit";
import spotifyApi from "./spotifyApi.js";

const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});

export default store;
