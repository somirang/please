import { connectRouter, RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import reducers from "./reducers";
import { History } from "history";

export interface ApplicationState {
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
