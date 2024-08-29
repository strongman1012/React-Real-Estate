import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store/store';
import { fetchAreasAPI, fetchAreaByIdAPI, createAreaAPI, updateAreaAPI, deleteAreaAPI, Area1 } from './area1API';

interface AreaState {
    allAreas: Area1[];
    currentArea?: Area1;
    editable?: boolean;
}

const initialState: AreaState = {
    allAreas: [],
};

const area1Slice = createSlice({
    name: 'area1',
    initialState,
    reducers: {
        resetAreas: (state) => {
            state.allAreas = [];
            state.currentArea = undefined;
            state.editable = false;
        },
        setAreas: (state, action: PayloadAction<any>) => {
            state.allAreas = action.payload.result;
            state.editable = action.payload.editable;
        },
        setCurrentArea: (state, action: PayloadAction<any>) => {
            state.currentArea = action.payload;
        },
        addArea: (state, action: PayloadAction<Area1>) => {
            state.allAreas.push(action.payload);
        },
        updateArea: (state, action: PayloadAction<Area1>) => {
            const updatedArea = action.payload;
            const existingIndex = state.allAreas.findIndex(area => area.id === updatedArea.id);
            if (existingIndex >= 0) {
                state.allAreas[existingIndex] = updatedArea;
            }
        },
        removeArea: (state, action: PayloadAction<number>) => {
            state.allAreas = state.allAreas.filter(
                area => action.payload !== area.id
            );
        },
    },
});

export const { resetAreas, setAreas, setCurrentArea, addArea, updateArea, removeArea } = area1Slice.actions;

export const fetchAreas = (userAccessLevel: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetchAreasAPI(userAccessLevel);
        dispatch(setAreas(response));
    } catch (error: any) {
        console.error('Error fetching areas:', error.response?.data?.message || error.message);
    }
};

export const fetchAreaById = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetchAreaByIdAPI(id);
        dispatch(setCurrentArea(response));
    } catch (error: any) {
        console.error('Error fetching area:', error.response?.data?.message || error.message);
    }
};

export const createArea = (formData: { title: string, description: string, level: number }) => async (dispatch: AppDispatch) => {
    try {
        const response = await createAreaAPI(formData);
        dispatch(addArea(response.area));
        return response.message;
    } catch (error: any) {
        const err_message = error.response?.data?.message || error.message;
        console.error('Error deleting users:', err_message);
        return err_message;
    }
};

export const updateAreaById = (id: number, formData: { title: string, description: string, level: number }) => async (dispatch: AppDispatch) => {
    try {
        const response = await updateAreaAPI(id, formData);
        dispatch(updateArea(response.area));
        return response.message;
    } catch (error: any) {
        const err_message = error.response?.data?.message || error.message;
        console.error('Error deleting users:', err_message);
        return err_message;
    }
};

export const deleteAreaById = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await deleteAreaAPI(id);
        dispatch(removeArea(id));
        return response.message;
    } catch (error: any) {
        const err_message = error.response?.data?.message || error.message;
        console.error('Error deleting users:', err_message);
        return err_message;
    }
};

export default area1Slice.reducer;
