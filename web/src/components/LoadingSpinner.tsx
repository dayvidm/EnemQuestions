import { Center, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
    return (
        <Center height="100vh">
            <Spinner size="xl" />
        </Center>
    );
};

export default LoadingSpinner;