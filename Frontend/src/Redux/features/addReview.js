import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addReview = createAsyncThunk(
  "review/addReview",
  async (ratingData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/api/review", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ratingData),
      });
      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to add review:", error);
      throw error;
    }
  }
);

const initialState = {
  review: {},
  error: null,
};

const addReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.fulfilled, (state, action) => {
        state.review = action.payload;
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default addReviewSlice.reducer;
