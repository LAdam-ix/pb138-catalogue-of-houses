import { Account, AccountWithData, ResponseSingle } from "../components/types";
import axiosInstance from "./base";

export const getDesignerCount = async (): Promise<ResponseSingle<number>> => {
    const response = await axiosInstance.get('/accounts/designersCount');
    return response.data;
}

export const getAccount = async (accountId: string): Promise<ResponseSingle<AccountWithData>> => {
    const response = await axiosInstance.get('/accounts/' + accountId);
    return response.data;
}