import { createSlice } from "@reduxjs/toolkit";

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    current: {},
  },
  reducers: {
    setQuote(state, action) {
      const quote = action.payload;
      state.current = quote;
    },
  },
  extraReducers: {},
});

export const { setQuote } = quoteSlice.actions;

export default quoteSlice.reducer;
