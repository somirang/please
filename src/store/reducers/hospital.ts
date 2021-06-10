import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    current: {},
  },
  reducers: {
    setHospital(state, action) {
      const hospital = action.payload;
      state.current = hospital;
    },
  },
  extraReducers: {},
});

export const { setHospital } = hospitalSlice.actions;

export default hospitalSlice.reducer;
