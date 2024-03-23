import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, thunkAPI) => {
      try {
        const response = await fetch("http://localhost:5000/user/order/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(orderData),
        });
        const data = await response.json();

        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
         .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
         .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;

