import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axiosConfig";
//import { useAppSelector } from "../../hooks/reduxHook";
import type { RootState } from "../../app/store";


export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number,
  productCategory: number;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.loggedUser?.token;
      const res = await axios.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error cargando productos");
    }
  }
);

// Create product
export const createProduct = createAsyncThunk<Product, Omit<Product, "id">, { state: RootState }>(
  "products/createProduct",
  async (product, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.loggedUser?.token;
      const res = await axios.post("/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error creando producto");
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk<Product, Product, { state: RootState }>(
  "products/updateProduct",
  async (product, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.loggedUser?.token;
      const res = await axios.put(`/products/${product.id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error actualizando producto");
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk<number, number, { state: RootState }>(
  "products/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.loggedUser?.token;
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error eliminando producto");
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; })

      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => { state.items.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;
