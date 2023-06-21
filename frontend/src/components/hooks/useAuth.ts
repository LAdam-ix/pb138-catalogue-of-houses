import { useQuery } from "react-query";
import { AuthAPI } from "../../services";

const useAuth = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["auth"],
        retry: false,
        queryFn: () => AuthAPI.authAccount(),
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    })

    return { auth: data, isLoading, isError };
}

export default useAuth;