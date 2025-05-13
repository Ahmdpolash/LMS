import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-type";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.order],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.order],
    }),
  }),
});


export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApi