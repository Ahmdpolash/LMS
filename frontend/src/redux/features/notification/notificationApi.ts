import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-type";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.notification],
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `/notification/update-notification-status/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const { useGetNotificationsQuery, useUpdateNotificationStatusMutation } =
  notificationApi;
