import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./feature/boardSlice";

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
