import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "admin",
  initialState: {
    accessToken: "",
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = slice.actions;

export default slice.reducer;
