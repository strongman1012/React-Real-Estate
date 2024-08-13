import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store/store';
import { loginAPI, registerAPI, forgotPasswordAPI, logoutAPI } from './authAPI';
import getUserFromToken from '../../utills/getUserFromToken';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../utills/getUserFromToken';
import { resetAreaLists } from '../areaList/areaListSlice';

export const initializeAuth = () => (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    const user = getUserFromToken(token, dispatch);

    if (user) {
        dispatch(loginSuccess({ token: token as string }));
    }
};

interface AuthState {
    user: any | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
    user: null, // Initial state starts with null
    token: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
        },
        loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
            state.user = jwtDecode<DecodedToken>(action.payload.token).user;
            localStorage.setItem('token', action.payload.token);
        },
        loginFailure: (state) => {
            state.status = 'failed';
        },
        registerStart: (state) => {
            state.status = 'loading';
        },
        registerSuccess: (state) => {
            state.status = 'succeeded';
        },
        registerFailure: (state) => {
            state.status = 'failed';
        },
        forgotPasswordStart: (state) => {
            state.status = 'loading';
        },
        forgotPasswordSuccess: (state) => {
            state.status = 'succeeded';
        },
        forgotPasswordFailure: (state) => {
            state.status = 'failed';
        },
        logoutStart: (state) => {
            state.status = 'loading';
        },
        logoutSuccess: (state) => {
            state.status = 'idle';
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    forgotPasswordStart,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    logoutStart,
    logoutSuccess
} = authSlice.actions;

export const login = (credentials: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const response = await loginAPI(credentials);
        dispatch(loginSuccess({ token: response.token }));
        return response.message;
    } catch (error: any) {
        dispatch(loginFailure());
        throw error.response?.data?.message || error.message;
    }
};

export const register = (userInfo: { userName: string; email: string; password: string }) => async (dispatch: AppDispatch) => {
    dispatch(registerStart());
    try {
        const response = await registerAPI(userInfo);
        dispatch(registerSuccess());
        return response.message;
    } catch (error: any) {
        dispatch(registerFailure());
        throw error.response?.data?.message || error.message;
    }
};

export const forgotPassword = (info: { email: string }) => async (dispatch: AppDispatch) => {
    dispatch(forgotPasswordStart());
    try {
        await forgotPasswordAPI(info);
        dispatch(forgotPasswordSuccess());
    } catch (error: any) {
        dispatch(forgotPasswordFailure());
        throw error.response?.data?.message || error.message;
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(logoutStart());
    const response = await logoutAPI();
    if (response) {
        dispatch(logoutSuccess());
        dispatch(resetAreaLists());
    }
};

export default authSlice.reducer;
