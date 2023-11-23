// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import spotifyApi from "./spotifyApi.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});

export default store;
