import { ResponseMulti } from "../components/types";
import { OrderResult } from "../components/types/OrderType";
import axiosInstance from "./base";

export const getSent = async (): Promise<ResponseMulti<OrderResult>> => {
    const response = await axiosInstance.get('/orders/sent');
    return response.data;
}

export const getReceived = async (): Promise<ResponseMulti<OrderResult>> => {
    const response = await axiosInstance.get('/orders/recived');
    return response.data;
}

export const postOrder = async (props: any) => {
    const response = await axiosInstance.post('/orders', props);
    return response.data
}