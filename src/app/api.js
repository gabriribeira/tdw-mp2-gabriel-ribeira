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
      },
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useUpdateUserMutation } = api;
