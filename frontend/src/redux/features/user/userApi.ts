import { baseApi } from "@/redux/api/baseApi";
import { loggedUser } from "../auth/authSlice";
import { RootState } from "@/redux/store";

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
          console.log(result.data.data.user, "dd");
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
  }),
});

export const { useUpdateAvatarMutation } = UserApi;
