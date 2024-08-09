import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth/authSlice';
import areaListReducer from '../reducers/areaList/areaListSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    areaList: areaListReducer,
});

export default rootReducer;
