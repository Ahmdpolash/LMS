import { baseApi } from "@/redux/api/baseApi";
import { loggedUser, logout, setUser } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      // set the token to reduxt state
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setUser({
              token: result.data.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "/user/activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
        credentials: "include",
      }),

      // set the user and token to reduxt state
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            loggedUser({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    socialLogin: builder.mutation({
      query: (body) => ({
        url: "/user/social-auth",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        console.log(result.data);
        dispatch(
          loggedUser({
            accessToken: result.data.data.accessToken,
            user: result.data.data.user,
          })
        );
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useActivationMutation,
  useCurrentUserQuery,
  useSocialLoginMutation,
} = authApi;
