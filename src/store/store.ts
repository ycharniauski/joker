import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import homeReducer from "./reducers/home/homeSlice";

function createStore() {
  return configureStore({
    reducer: {
      home: homeReducer,
    },
  });
}

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
