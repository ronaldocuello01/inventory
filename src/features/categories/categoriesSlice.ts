import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axiosConfig";

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

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const res = await axios.get("/productcategories");
  return res.data;
});

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
