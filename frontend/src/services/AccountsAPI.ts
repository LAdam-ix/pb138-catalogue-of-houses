import { ResponseMulti } from "../components/types";
import axiosInstance from "./base";

export const getDesignerCount = async (): Promise<ResponseMulti<number>> => {
    const response = await axiosInstance.get('/accounts/designersCount');
    return response.data;
}