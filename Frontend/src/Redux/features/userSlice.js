import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (thunkAPI) => {
    try {
      const userDetailsResponse = await fetch(
        "http://localhost:5000/api/user/userDetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!userDetailsResponse.ok) {
        const data = await userDetailsResponse.json();
        return thunkAPI.rejectWithValue(data);
      }
      const data = await userDetailsResponse.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async(thunkAPI) => {
    try {
      const logoutResponse = await fetch("http://localhost:5000/api/user/logout",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!logoutResponse.ok) {
        const data = await logoutResponse.json();
        return thunkAPI.rejectWithValue(data);
      }
      const data = await logoutResponse.json();
      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);      
    }
  });
  
const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true; 
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true; 
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {};
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export default userSlice.reducer;