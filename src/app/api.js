import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";

export const api = createApi({
  //eslint-disable-next-line
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
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
    register: builder.mutation({
      query: ({ email, name, username, password }) => ({
        url: "users/register",
        method: "POST",
        body: { email, name, username, password },
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
    getUserById: builder.query({
      query: (id) => `users/${id}`,
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
      query: ({ user_id, entry_date }) => ({
        url: `calendar/remove`,
        method: "DELETE",
        body: { user_id, entry_date },
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
        method: "DELETE",
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
        method: "DELETE",
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
        method: "DELETE",
        body: { user_id, track_id },
      }),
    }),
    getEmmes: builder.query({
      query: (user_id) => `emmes/${user_id}`,
    }),
    sendEmme: builder.mutation({
      query: ({ sender_id, receiver_id, is_anonymous, message, track_id }) => ({
        url: `emmes/send`,
        method: "POST",
        body: { sender_id, receiver_id, is_anonymous, message, track_id },
      }),
    }),
    searchUsers: builder.query({
      query: (search) => `users/search/${search}`,
    }),
    emmeFeedback: builder.mutation({
      query: ({ emme_id, feedback }) => ({
        url: `emmes/feedback`,
        method: "PUT",
        body: { emme_id, feedback },
      }),
    }),
    updateUserName: builder.mutation({
      query: ({ user_id, name }) => ({
        url: `users/name`,
        method: "PUT",
        body: { user_id, name },
      }),
    }),
    updateUserDescription: builder.mutation({
      query: ({ user_id, description }) => ({
        url: `users/description`,
        method: "PUT",
        body: { user_id, description },
      }),
    }),
    updateProfilePicture: builder.mutation({
      //eslint-disable-next-line
      query: ({ user_id, profilePicture }) => {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("profile_picture", profilePicture);

        return {
          url: `/users/profilePicture`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
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
  useGetEmmesQuery,
  useSendEmmeMutation,
  useSearchUsersQuery,
  useEmmeFeedbackMutation,
  useUpdateUserNameMutation,
  useUpdateUserDescriptionMutation,
  useUpdateProfilePictureMutation,
} = api;
