import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axiosConfig";
import type { RootState } from "../../app/store";

export interface Category {
  id: number;
  name: string;
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = { items: [], loading: false, error: null };

// export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
//   const res = await axios.get("/productcategories");
//   return res.data;
// });

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.loggedUser?.token;
      const res = await axios.get("/productcategories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error cargando productos");
    }
  }
);


const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; });
  }
});

export default categoriesSlice.reducer;
