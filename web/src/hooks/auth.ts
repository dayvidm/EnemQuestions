import { useParams, useRouter } from 'next/navigation';
import { fetcher } from '../../utils/swrConfig';
import useSWR from 'swr';
import axios from '../../utils/axios';
import { useEffect } from 'react';

interface UseAuthParams {
    middleware?: 'guest' | 'auth';
    redirectIfAuthenticated?: string;
}

interface AuthProps {
    setErrors: (errors: Record<string, string[]>) => void;
    setStatus?: (status: string | null) => void;
    [key: string]: any;
}

const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthParams = {}) => {
    const router = useRouter();
    const params = useParams();

    const { data: user, error, mutate } = useSWR('/api/user', fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        shouldRetryOnError: false,
    });

    const refreshUser = async () => {
        await mutate();
    };

    const csrf = async () => {
        try {
            await axios.get('http://localhost:8080/sanctum/csrf-cookie', {
                withCredentials: true,
            });
        } catch (error) {
            console.error('CSRF Cookie error:', error);
        }
    };

    const handleError = (error: any, setErrors: (errors: Record<string, string[]>) => void) => {
        if (error.response?.status === 422) {
            setErrors(error.response.data.errors);
        } else {
            throw error;
        }
    };


    // const register = async ({ setErrors, ...props }: AuthProps) => {
    //     await csrf();
    //     setErrors([]);
    //     try {
    //         await axios.post('/register', props);
    //         mutate();
    //     } catch (error: any) {
    //         handleError(error, setErrors);
    //     }
    // };

    const register = async ({ setErrors, ...props }: AuthProps) => {
        // Garantir que o token CSRF seja obtido antes da requisição
        await csrf();

        setErrors([]);  // Limpar erros anteriores

        try {
            // Enviar a requisição POST com os dados do usuário
            await axios.post('/register', props, {
                headers: {
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')  // Incluir o token CSRF no cabeçalho
                }
            });

            // Realizar a mutação após o sucesso da requisição
            mutate();
        } catch (error: any) {
            // Tratar os erros
            handleError(error, setErrors);
        }
    };

    // Função para obter o cookie CSRF
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const part = parts.pop();
            if (part) {
                return part.split(';').shift();
            }
        }
    }

    const login = async ({ setErrors, setStatus, ...props }: AuthProps) => {
        await csrf();
        setErrors([]);
        setStatus?.(null);
        try {
            await axios.post('/login', props);
            mutate();
        } catch (error: any) {
            handleError(error, setErrors);
        }
    };

    const forgotPassword = async ({ setErrors, setStatus, email }: AuthProps) => {
        await csrf();
        setErrors([]);
        setStatus?.(null);
        try {
            const response = await axios.post('/forgot-password', { email });
            setStatus?.(response.data.status);
        } catch (error: any) {
            handleError(error, setErrors);
        }
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }: AuthProps) => {
        await csrf();
        setErrors([]);
        setStatus?.(null);
        try {
            const response = await axios.post('/reset-password', {
                token: params.token,
                ...props,
            });
            router.push(`/login?reset=${btoa(response.data.status)}`);
        } catch (error: any) {
            handleError(error, setErrors);
        }
    };

    const resendEmailVerification = async ({ setStatus }: { setStatus: (status: string) => void }) => {
        const response = await axios.post('/email/verification-notification');
        setStatus(response.data.status);
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout');
            mutate();
        }
        router.push('/auth/login');
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        } else if (middleware === 'auth') {
            if (!user?.email_verified_at) {
                router.push('/verify-email');
            } else if (error) {
                logout();
            }
        }
    }, [user, error]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        mutate,
        refreshUser
    };
};

export default useAuth;
