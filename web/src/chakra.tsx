import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ChakraProps {
  children: ReactNode;
}

const Chakra = ({ children }: ChakraProps) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Chakra;