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

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1", // Your API URL
  credentials: "include", // Ensure cookies are sent with requests
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
