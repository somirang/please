import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ApplicationState, createRootReducer } from "./store";
import { History } from "history";

export default function configureAppStore(
  preloadedState: ApplicationState,
  history: History
) {
  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [...getDefaultMiddleware()],
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
}
