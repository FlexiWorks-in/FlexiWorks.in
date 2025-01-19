import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/api";
import { authService } from "../../services";
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await authService.login(email, password);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await authService.logout();
    return response;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(logout.pending, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
