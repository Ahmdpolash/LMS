import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loggedUser } from "../features/auth/authSlice";
import { tagTypes, tagTypesList } from "../tag-type";
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
      providesTags: [tagTypes.user],
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            const token =
              (getState() as any).auth?.token ||
              (typeof window !== "undefined"
                ? localStorage.getItem("accessToken")
                : null);

            dispatch(
              loggedUser({
                accessToken: token,
                user: data.data,
              })
            );

            if (typeof window !== "undefined") {
              localStorage.setItem("user", JSON.stringify(data.data));
            }
          }
        } catch (error) {
          // not logged in or invalid token
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCurrentUserQuery, useRefreshTokenMutation } = baseApi;
