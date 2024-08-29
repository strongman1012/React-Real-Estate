import { selfApiClient } from '../../utills/config';

export interface Area2 {
    id: number;
    subject: string;
    content: string;
    level: number;
}

export const fetchAreasAPI = async (userAccessLevel: number): Promise<any> => {
    const response = await selfApiClient.get<any>(`/area2/all/${userAccessLevel}`);
    return response.data;
};

export const fetchAreaByIdAPI = async (id: number): Promise<any> => {
    const response = await selfApiClient.get<any>(`/area2/${id}`);
    return response.data;
};

export const createAreaAPI = async (formData: { subject: string, content: string, level: number }): Promise<any> => {
    const response = await selfApiClient.post<Area2>('/area2', { ...formData });
    return response.data;
};

export const updateAreaAPI = async (id: number, formData: { subject: string, content: string, level: number }): Promise<any> => {
    const response = await selfApiClient.put<any>(`/area2/${id}`, { ...formData });
    return response.data;
};

export const deleteAreaAPI = async (id: number): Promise<any> => {
    const response = await selfApiClient.delete(`/area2/${id}`)
    return response.data
};
