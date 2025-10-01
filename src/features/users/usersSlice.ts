import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axiosConfig";

export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  token: string;
}

interface UsersState {
  items: User[];
  loggedUser: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

const initialState: UsersState = { items: [], loggedUser: null, loading: false, error: null };

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("/users");
  return res.data;
});

export const fetchLogin = createAsyncThunk("users/fetchLogin", async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", { email, password });
      if (res.data.status != null && res.data.status == "500"){
        return rejectWithValue("Error en login");
      }
      localStorage.setItem("userSession", JSON.stringify(res.data));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error en login");
    }
  }
);

export const createUser = createAsyncThunk("users/createUser", async (user: Omit<User, "id">) => {
  const res = await axios.post("/users/signup", user);
  return res.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user: User) => {
  const res = await axios.put(`/users/${user.id}`, user);
  return res.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: number) => {
  await axios.delete(`/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      state.loggedUser = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("userSession");
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar usuarios";
      });

    // Login
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loggedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error en login";
      });

    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creando usuario";
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error actualizando usuario";
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error eliminando usuario";
      });
  },
});

export const { logout, setUser } = usersSlice.actions;
export default usersSlice.reducer;
