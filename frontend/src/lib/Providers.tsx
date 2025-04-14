"use client";

import { persistor, store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
