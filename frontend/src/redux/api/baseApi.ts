import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loggedUser } from "../features/auth/authSlice";
import { tagTypesList } from "../tag-type";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // baseUrl: 'https://lms-backend-seven-ruddy.vercel.app/api/v1',
    baseUrl: "http://localhost:8000/api/v1",
    credentials: "include",
  }),
  tagTypes: tagTypesList,

  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include",
      }),
    }),
    currentUser: builder.query({
      query: (data) => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCurrentUserQuery, useRefreshTokenMutation } = baseApi;
