import { callFetchAccount } from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const response = await callFetchAccount();
    return response.data.data;
  }
);

export interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshToken: boolean;
  errorRefreshToken: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: {
      _id: string;
      name: string;
    };
    permissions: {
      _id: string;
      name: string;
      apiPath: string;
      method: string;
      module: string;
    }[];
  };
  activeMenu: string;
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: "",
  user: {
    _id: "",
    email: "",
    name: "",
    role: {
      _id: "",
      name: "",
    },
    permissions: [],
  },
  activeMenu: "home",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      console.log(">>> acction: ", action);
      state.activeMenu = action.payload;
    },
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user._id = action?.payload?._id;
      state.user.email = action?.payload?.email;
      state.user.name = action?.payload?.name;
      state.user.role = action?.payload?.role;
      state.user.permissions = action?.payload?.permissions;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = false;
          state.isLoading = true;
        }
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.isLoading = false;
          state.user._id = action?.payload?.user?._id;
          state.user.email = action?.payload?.user?.email;
          state.user.name = action?.payload?.user?.name;
          state.user.role = action?.payload?.user?.role;
          state.user.permissions = action?.payload?.user?.permissions;
        }
      })
      .addCase(fetchAccount.rejected, (state, acction) => {
        if (acction.payload) {
          state.isAuthenticated = false;
          state.isLoading = false;
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveMenu, setUserLoginInfo } = accountSlice.actions;

export default accountSlice.reducer;
