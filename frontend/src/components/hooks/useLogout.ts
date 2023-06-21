import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../services";

const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { mutateAsync: logout, isLoading, isError } = useMutation({
        mutationFn: () => AuthAPI.logoutAccount(),
        onSuccess: () => {
            navigate('/');
            queryClient.resetQueries(['auth']);
        },
    })

    return { logout, isLoading, isError };
}

export default useLogout;