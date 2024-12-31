"use server"

import TopBar from '@/components/topbar';
import { Button } from '@/components/ui/button';
import { Provider } from '@/components/ui/provider';
import { createSystem, defineConfig } from '@chakra-ui/react';
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
          {children}
          </Provider>
      </body>
    </html>
  );
};

export default Layout;