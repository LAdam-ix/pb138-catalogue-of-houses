import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../services";
import { FieldValues } from "react-hook-form";


const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { mutateAsync: login, isLoading, isError } = useMutation({
        mutationFn: (props: FieldValues) => AuthAPI.loginAccount(props),
        retry: false,
        onSuccess: () => {
            navigate('/');
            queryClient.invalidateQueries(['auth']);
        },
    })
    return {login, isLoading, isError};
}

export default useLogin;