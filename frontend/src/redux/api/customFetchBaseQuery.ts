import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { persistor } from "../store";
import { logout } from "../features/auth/authSlice";

// Create a mutex to prevent multiple refresh token requests
const mutex = new Mutex();

const getBaseUrl = () => {
  // Use the production API URL when deployed, otherwise use the local URL
  if (process.env.NODE_ENV === "production") {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      "https://lms-backend-zeta-opal.vercel.app/api/v1"
    );
  }
  return process.env.NEXT_PUBLIC_API_URL_LOCAL;
};

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.NEXT_PUBLIC_API_URL,
  baseUrl: getBaseUrl(),
  credentials: "include",
});

const customFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait for any ongoing token refresh to complete
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // Check if the request failed due to an expired token (401 Unauthorized)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the token
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh token is invalid or expired; log the user out
          api.dispatch(logout()); // Dispatch a logout action (you'll define this)
          //   await persistor.purge();
          //   window.location.href = "/sign-in"; // Redirect to sign-in page
        }
      } finally {
        release();
      }
    } else {
      // If another refresh is in progress, wait for it to complete and retry the request
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBaseQuery;
