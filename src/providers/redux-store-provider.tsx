"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/app/store";

export function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
