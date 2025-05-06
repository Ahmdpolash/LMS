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

    getAllLayoutById: builder.query({
      query: (type) => ({
        url: `/layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.layout],
    }),

    editLayout: builder.mutation({
      query: (data) => ({
        url: "/layout/update-layout",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.layout],
    }),
  }),
});

export const {
  useCreateLayoutMutation,
  useGetAllLayoutByIdQuery,
  useEditLayoutMutation,
} = layoutApi;
