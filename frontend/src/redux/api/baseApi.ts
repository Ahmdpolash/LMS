import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loggedUser } from "../features/auth/authSlice";
import { tagTypesList } from "../tag-type";
import customFetchBaseQuery from "./customFetchBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: customFetchBaseQuery,

  tagTypes: tagTypesList,

  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include",
      }),
    }),
    currentUser: builder.query({
      query: () => ({
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
