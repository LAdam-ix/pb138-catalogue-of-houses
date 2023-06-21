import { HouseResult, ResponseMulti } from "../components/types";
import axiosInstance from "./base";

export const getAll = async (): Promise<ResponseMulti<HouseResult>> => {
    const response = await axiosInstance.get('/houses');
    return response.data;
}

export const create = async (props: any) => {
    const response = await axiosInstance.post('/houses', props);
    return response.data;
}

export const patch = async (id: string, props: any) => {
    const response = await axiosInstance.patch('/houses/' + id , props);
    return response.data;
}