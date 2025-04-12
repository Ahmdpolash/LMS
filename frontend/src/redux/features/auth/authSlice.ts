import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { token } = action.payload;
      console.log(token);
      // state.user = user;
      state.token = token;
    },
    loggedUser(state, action) {
      const { user, accessToken } = action.payload;
      state.token = accessToken;
      state.user = user;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout, loggedUser } = authSlice.actions;

export default authSlice.reducer;
