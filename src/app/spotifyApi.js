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
    getPlaylist: builder.query({
      query: () => `playlists/5LjMoUjVPKDZyaSj5ynLWA/tracks`,
    }),
    getTrackById: builder.query({
      query: (term) => `tracks?ids=${term}`,
    }),
    getAlbumById: builder.query({
      query: (term) => `albums/${term}`,
    }),
    getArtistById: builder.query({
      query: (term) => `artists/${term}`,
    }),
    getArtistTopTracksById: builder.query({
      query: (term) => `artists/${term}/top-tracks?market=US`,
    }),
    getArtistAlbumsById: builder.query({
      query: (term) =>
        `artists/${term}/albums?market=US&include_groups=album,single`,
    }),
    getSearch: builder.query({
      query: (term) => `search?q=${term}&type=track,artist,album&limit=10`,
    }),
    getRecommendationsByTrack: builder.query({
      query: (term) => `recommendations?seed_tracks=${term}&limit=20`,
    }),
  }),
});

export const {
  useGetPlaylistQuery,
  useGetTrackByIdQuery,
  useGetAlbumByIdQuery,
  useGetArtistByIdQuery,
  useGetArtistTopTracksByIdQuery,
  useGetArtistAlbumsByIdQuery,
  useGetSearchQuery,
  useGetRecommendationsByTrackQuery,
} = spotifyApi;

export default spotifyApi;
