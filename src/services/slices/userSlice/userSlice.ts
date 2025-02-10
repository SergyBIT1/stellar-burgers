import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TRegisterData,
  loginUserApi,
  getUserApi,
  registerUserApi,
  TLoginData,
  updateUserApi,
  logoutApi,
  getOrdersApi
} from '../../../utils/burger-api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  loading: boolean;
  error: string | null;
  registerData: TRegisterData | null;
  user: TUser | null;
  userCheck: boolean;
  isAuthenticated: boolean;
  userOrders: TOrder[];
};

export const initialState: TUserState = {
  loading: false,
  error: null,
  registerData: null,
  user: null,
  userCheck: false,
  isAuthenticated: false,
  userOrders: []
};

export const registerUser = createAsyncThunk('user/regUser', registerUserApi);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const getOrdersAll = createAsyncThunk('user/ordersUser', getOrdersApi);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
    checkUser: (state) => {
      state.userCheck = true;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getUserCheckSelector: (state) => state.userCheck,
    getError: (state) => state.error,
    getUserLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
        state.user = null;
      })
      .addCase(getOrdersAll.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { userLogout, resetError, checkUser } = userSlice.actions;
export const {
  getUserSelector,
  getUserCheckSelector,
  getUserLoading,
  getError
} = userSlice.selectors;
export default userSlice.reducer;
