import { Account, ResponseSingle } from "../components/types";
import axiosInstance from "./base";

export const getDesignerCount = async (): Promise<ResponseSingle<number>> => {
    const response = await axiosInstance.get('/accounts/designersCount');
    return response.data;
}

export const getAccount = async (accountId: string): Promise<ResponseSingle<Account>> => {
    const response = await axiosInstance.get('/accounts/' + accountId);
    return response.data;
}