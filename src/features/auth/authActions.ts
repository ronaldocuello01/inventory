import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../users/usersSlice";

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUserFromStorage",
  async (_, { dispatch }) => {
    const session = localStorage.getItem("userSession");
    if (session) {
      const user = JSON.parse(session);
      dispatch(setUser(user));
    }
  }
);
