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
    getUserTracks: builder.query({
      query: (user_id) => `tracks/${user_id}`,
    }),
    getUserAlbums: builder.query({
      query: (user_id) => `albums/${user_id}`,
    }),
    getUserArtists: builder.query({
      query: (user_id) => `artists/${user_id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateUserMutation,
  useGetCalendarQuery,
  useGetUserTracksQuery,
  useGetUserAlbumsQuery,
  useGetUserArtistsQuery,
} = api;
