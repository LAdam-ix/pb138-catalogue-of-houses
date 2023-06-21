import axiosInstance from "./base";

export const getSent = async () => {
    const response = await axiosInstance.get('/orders/sent');
    return response.data;
}

export const getRecieved = async () => {
    const response = await axiosInstance.get('/orders/recived');
    return response.data;
}