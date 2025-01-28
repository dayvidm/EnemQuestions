"use client"
import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/auth';
import { useState } from "react";

function TopBar() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        setLoading(true); // Ativar o estado de carregamento
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            setLoading(false); // Desativar o estado de carregamento
        }
    };

    return (
        <Box width="100%" padding="1" backgroundColor="gray.300">
            <Flex maxWidth="container.xl" margin="auto" justifyContent="space-between" alignItems="center">
                <Text fontSize="xl">Enem Questions</Text>
                <Box>
                    {user ? (
                        <>
                            <Text display="inline" mr={4}>Hello, {user.name}</Text>
                            <Button colorScheme="teal" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button colorScheme="teal" onClick={() => router.push('/auth/login')} loading={loading}>Login</Button>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export default TopBar;