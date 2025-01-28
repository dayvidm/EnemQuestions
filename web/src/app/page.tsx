"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Input, Heading } from '@chakra-ui/react';
import useAuth from '@/hooks/auth';
import AuthSessionStatus from '../app/auth/AuthSessionStatus';
import InputError from '@/components/InputError';

const Login = () => {
    const router = useRouter();
    const { user, login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const submitForm = async (event: React.FormEvent) => {
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
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    mb={3}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    mb={3}
                />
                <InputError messages={errors} className="mt-2" />
                <Button type="submit" colorScheme="teal" width="full" >
                    Login
                </Button>
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
