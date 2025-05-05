import { baseApi } from "@/redux/api/baseApi";
import { loggedUser } from "../auth/authSlice";
import { RootState } from "@/redux/store";
import { tagTypes } from "@/redux/tag-type";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/auth/change-avatar",
        method: "PATCH",
        body: { avatar },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;
          const token = (getState() as RootState).auth.token;

          if (token) {
            dispatch(
              loggedUser({
                accessToken: token,
                user: result.data.data,
              })
            );
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    updateProfileInfo: builder.mutation({
      query: (body) => ({
        url: "/user/update",
        method: "PATCH",
        body,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;

          const token = (getState() as RootState).auth.token;

          if (token) {
            dispatch(
              loggedUser({
                accessToken: token,
                user: result.data.data,
              })
            );
          }
        } catch (err) {
          console.error(err);
        }
      },
      invalidatesTags: [tagTypes.user],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changeUserRole: builder.mutation({
      query: (data) => ({
        url: "/user/update-role",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateProfileInfoMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useChangeUserRoleMutation,
} = UserApi;
