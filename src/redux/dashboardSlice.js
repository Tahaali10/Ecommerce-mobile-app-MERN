import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosTokenInstance/AxiosTokenInstance";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  categories: [],
  status: "idle", 
  error: null,
};

export const fetchProducts = createAsyncThunk("dashboard/fetchProducts", async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
});

export const addProduct = createAsyncThunk("dashboard/addProduct", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    toast.success("Product added successfully");
    return response.data;
  } catch (err) {
    toast.error("Failed to add product");
    return rejectWithValue(err.response.data);
  }
});

export const updateProduct = createAsyncThunk("dashboard/updateProduct", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    toast.success("Product updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update product");
    return rejectWithValue(error.response.data);
  }
});

export const deleteProduct = createAsyncThunk("dashboard/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/products/${id}`);
    toast.success("Product deleted successfully");
    return id; // Return the id so that it can be used to update the state in the reducer
  } catch (error) {
    toast.error("Failed to delete product");
    return rejectWithValue(error.response.data);
  }
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default dashboardSlice.reducer;
