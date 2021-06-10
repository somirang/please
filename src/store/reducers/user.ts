import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.current = user;
    },
  },
  extraReducers: {},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
