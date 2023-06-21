import axiosInstance from "./base";

export const getSent = async () => {
    const response = await axiosInstance.get('/orders/sent');
    return response.data;
}

export const getReceived = async () => {
    const response = await axiosInstance.get('/orders/recived');
    return response.data;
}

export const postOrder = async (props: any) => {
    const response = await axiosInstance.post('/orders', props);
    return response.data
}