import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-type";

export const layoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLayout: builder.mutation({
      query: (data) => ({
        url: "/layout/create-layout",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.layout],
    }),

    getAllLayouts: builder.query({
      query: () => ({
        url: "/layout",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.layout],
    }),
  }),
});

export const { useCreateLayoutMutation, useGetAllLayoutsQuery } = layoutApi;
