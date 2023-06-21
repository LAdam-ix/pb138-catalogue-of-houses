import { FieldValues } from "react-hook-form";
import axiosInstance from "./base";

export const registerAccount = async (data: FieldValues) => {
    return (await axiosInstance.post('/auth/registration', data)).data;
}

export const loginAccount = async (data: FieldValues) => {
    return (await axiosInstance.post("/auth/login", data)).data;
}

export const authAccount = async () => {
    return (await axiosInstance.get("/auth", {})).data;
}