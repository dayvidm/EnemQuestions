"use client"
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '@/components/topbar';
import { Provider } from '@/components/ui/provider';
import { Box, Flex } from '@chakra-ui/react';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}


const Layout = ({ children }: LayoutProps) => {


  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <TopBar />
          <Flex direction="column" align="center" justify="center" minH="100vh">
            <Box width="100%" maxW="container.md" p={4}>
              {children}
            </Box>
          </Flex>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;