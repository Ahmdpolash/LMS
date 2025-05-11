import { baseApi } from "@/redux/api/baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "/analytics/course-analytics",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserAnalytics: builder.query({
      query: () => ({
        url: "/analytics/user-analytics",
        method: "GET",
        credentials: "include",
      }),
    }),
    getOrderAnalytics: builder.query({
      query: () => ({
        url: "/analytics/order-analytics",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetUserAnalyticsQuery,
  useGetOrderAnalyticsQuery,
} = analyticsApi;
