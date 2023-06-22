import axiosInstance from "./base";

export const createRating = async (props: any) => {
    const response = await axiosInstance.post('/ratings', props);
    return response.data;
}

export const deleteRating = async (id: any) => {
    const response = await axiosInstance.delete('/ratings/' + id);
    return response.data;
}