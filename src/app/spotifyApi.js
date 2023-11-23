// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAccessToken = async () => {
  // eslint-disable-next-line no-undef
  const clientId = process.env.REACT_APP_CLIENT_ID;
  // eslint-disable-next-line no-undef
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const client = window.btoa(`${clientId}:${clientSecret}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${client}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers,
    body,
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token?",
      requestOptions,
    );
    const data = await response.json();

    localStorage.removeItem("Bearer");
    localStorage.setItem("Bearer", data.access_token);

    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error; // Propagate the error if token fetch fails
  }
};

const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/",
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: (term) => `search?q=${term}&type=track`,
    }),
    getAlbums: builder.query({
      query: (term) => `search?q=${term}&type=album`,
    }),
    getArtist: builder.query({
      query: (term) => `search?q=${term}&type=artist`,
    }),
    getPlaylist: builder.query({
      query: () => `playlists/5LjMoUjVPKDZyaSj5ynLWA/tracks`,
    }),
    // Add more endpoints as needed
  }),
});

export const {
  useGetTracksQuery,
  useGetAlbumsQuery,
  useGetArtistQuery,
  useGetPlaylistQuery,
} = spotifyApi;

export default spotifyApi;
