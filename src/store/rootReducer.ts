import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'src/reducers/auth/authSlice';
import areaListReducer from 'src/reducers/areaList/areaListSlice';
import area1Reducer from 'src/reducers/area1/area1Slice';
import area2Reducer from 'src/reducers/area2/area2Slice';

const rootReducer = combineReducers({
    auth: authReducer,
    areaList: areaListReducer,
    area1: area1Reducer,
    area2: area2Reducer
});

export default rootReducer;
