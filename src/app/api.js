import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "users/login",
        method: "POST",
        body: { username, password },
      }),
      onQuerySuccess: (data) => {
        const dispatch = useDispatch();
        dispatch(setToken(data.token));
        api.setHeader("Authorization", `Bearer ${data.token}`);
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getCalendar: builder.query({
      query: (user_id) => `calendar/${user_id}`,
    }),
    addCalendar: builder.mutation({
      query: ({ user_id, track_id, date }) => ({
        url: `calendar/add`,
        method: "POST",
        body: { user_id, track_id, date },
      }),
    }),
    removeCalendar: builder.mutation({
      query: ({ user_id, track_id }) => ({
        url: `calendar/remove`,
        method: "POST",
        body: { user_id, track_id },
      }),
    }),
    getUserTracks: builder.query({
      query: (user_id) => `tracks/${user_id}`,
    }),
    getUserAlbums: builder.query({
      query: (user_id) => `albums/${user_id}`,
    }),
    getUserArtists: builder.query({
      query: (user_id) => `artists/${user_id}`,
    }),
    addArtist: builder.mutation({
      query: ({ user_id, artist_id }) => ({
        url: `artists/add`,
        method: "POST",
        body: { user_id, artist_id },
      }),
    }),
    removeArtist: builder.mutation({
      query: ({ user_id, artist_id }) => ({
        url: `artists/remove`,
        method: "POST",
        body: { user_id, artist_id },
      }),
    }),
    addAlbum: builder.mutation({
      query: ({ user_id, album_id }) => ({
        url: `albums/add`,
        method: "POST",
        body: { user_id, album_id },
      }),
    }),
    removeAlbum: builder.mutation({
      query: ({ user_id, album_id }) => ({
        url: `albums/remove`,
        method: "POST",
        body: { user_id, album_id },
      }),
    }),
    addTrack: builder.mutation({
      query: ({ user_id, track_id }) => ({
        url: `tracks/add`,
        method: "POST",
        body: { user_id, track_id },
      }),
    }),
    removeTrack: builder.mutation({
      query: ({ user_id, track_id }) => ({
        url: `tracks/remove`,
        method: "POST",
        body: { user_id, track_id },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateUserMutation,
  useGetCalendarQuery,
  useAddCalendarMutation,
  useRemoveCalendarMutation,
  useGetUserTracksQuery,
  useGetUserAlbumsQuery,
  useGetUserArtistsQuery,
  useAddArtistMutation,
  useRemoveArtistMutation,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
  useAddTrackMutation,
  useRemoveTrackMutation,
} = api;
