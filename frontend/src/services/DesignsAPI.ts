import { DesignType, ResponseMulti } from "../types";
import axiosInstance from "./base";

export const getAll = async (): Promise<ResponseMulti<DesignType>> => {
    const response = await axiosInstance.get('/houses');
    return response.data;
}