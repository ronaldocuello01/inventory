import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axiosConfig";

export interface Role {
  id: number;
  name: string;
}

interface RolesState {
  items: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = { items: [], loading: false, error: null };

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const res = await axios.get("/userroles");
  return res.data;
});

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchRoles.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; });
  }
});

export default rolesSlice.reducer;
