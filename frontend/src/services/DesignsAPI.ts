import { HouseResult, ResponseMulti } from "../components/types";
import axiosInstance from "./base";

export const getAll = async (): Promise<ResponseMulti<HouseResult>> => {
    const response = await axiosInstance.get('/houses');
    return response.data;
}