import axiosInstance from "./base";

export const create = async (props: any) => {
    const response = await axiosInstance.post('/ratings', props);
    return response.data;
}