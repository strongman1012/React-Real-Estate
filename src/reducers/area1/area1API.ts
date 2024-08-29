import { selfApiClient } from '../../utills/config';

export interface Area1 {
    id: number;
    title: string;
    description: string;
    level: number;
}

export const fetchAreasAPI = async (userAccessLevel: number): Promise<any> => {
    const response = await selfApiClient.get<any>(`/area1/all/${userAccessLevel}`);
    return response.data;
};

export const fetchAreaByIdAPI = async (id: number): Promise<any> => {
    const response = await selfApiClient.get<any>(`/area1/${id}`);
    return response.data;
};

export const createAreaAPI = async (formData: { title: string, description: string, level: number }): Promise<any> => {
    const response = await selfApiClient.post<Area1>('/area1', { ...formData });
    return response.data;
};

export const updateAreaAPI = async (id: number, formData: { title: string, description: string, level: number }): Promise<any> => {
    const response = await selfApiClient.put<any>(`/area1/${id}`, { ...formData });
    return response.data;
};

export const deleteAreaAPI = async (id: number): Promise<any> => {
    const response = await selfApiClient.delete(`/area1/${id}`)
    return response.data
};
