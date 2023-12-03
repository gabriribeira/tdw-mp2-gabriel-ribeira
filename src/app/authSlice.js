// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: loadUserFromLocalStorage(),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUser, clearUser } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
