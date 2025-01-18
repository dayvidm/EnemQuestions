"use client";
import { useState, useEffect } from 'react';
import { useSearchParams,useRouter } from 'next/navigation';
import { Box, Button, Input, Heading } from '@chakra-ui/react';
import useAuth from '@/hooks/auth';
import AuthSessionStatus from '../AuthSessionStatus';
import InputError from '@/components/InputError';

const Login = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const reset = searchParams.get('reset');
        if (reset) {
            setStatus(atob(reset));
        }
    }, [searchParams]);

    const submitForm = async (event) => {
        event.preventDefault();
        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
            <AuthSessionStatus className="mb-4" status={status} />
            <Heading mb={6}>Login</Heading>
            <form onSubmit={submitForm}>
                Email:
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                Password:
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputError messages={errors.password} className="mt-2" />
                <Button type="submit" colorScheme="teal" width="full">Login</Button>
                <Button
                    colorScheme="teal"
                    width="full"
                    variant="outline"
                    onClick={() => router.push('/auth/register')}
                >
                    Register
                </Button>
            </form>
        </Box>
    );
};

export default Login;