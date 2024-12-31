"use client"
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/auth';

function TopBar() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
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
                        <Button colorScheme="teal" onClick={() => router.push('/auth/login')}>Login</Button>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export default TopBar;