export const getBaseApiUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return (
        process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://localhost:8000/api/v1"
      );
    }
  }

  if (process.env.NODE_ENV === "development") {
    return (
      process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://localhost:8000/api/v1"
    );
  }

  return (
    process.env.NEXT_PUBLIC_API_URL ||
    "https://lms-backend-zeta-opal.vercel.app/api/v1"
  );
};

export const getSocketUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return (
        process.env.NEXT_PUBLIC_SOCKET_API_URL_LOCAL || "http://localhost:8000"
      );
    }
  }

  if (process.env.NODE_ENV === "development") {
    return (
      process.env.NEXT_PUBLIC_SOCKET_API_URL_LOCAL || "http://localhost:8000"
    );
  }

  return (
    process.env.NEXT_PUBLIC_SOCKET_API_URL ||
    "https://lms-backend-zeta-opal.vercel.app"
  );
};
