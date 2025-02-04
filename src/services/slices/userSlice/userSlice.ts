import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
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
  // registerData: TRegisterData | null;
  userData: TUser | null;
  isAuthenticated: boolean;
  userOrders: TOrder[];
};

export const initialState: TUserState = {
  loading: false,
  error: null,
  // registerData: null,
  userData: null,
  isAuthenticated: false,
  userOrders: []
};

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

export const registerUser = createAsyncThunk('user/regUser', registerUserApi);
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
      state.userData = null;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserState: (state) => state,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        //ожидание
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        //неудачная регистрация
        state.loading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        //успешная регистрация
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
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
        state.userData = action.payload.user;
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
        state.userData = action.payload.user;
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
        state.userData = action.payload.user;
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
        state.userData = null;
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

export default userSlice.reducer;
