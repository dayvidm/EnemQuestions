"use client"

import { ChakraProvider, defaultSystem, Theme } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { createSystem, defaultConfig } from "@chakra-ui/react"
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', arial` },
      },
      spacing: {
        "128": { value: "32rem" },
        "144": { value: "36rem" },
      },
    },
  },
})
export function Provider(props: ColorModeProviderProps) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();

    return () => {
      handleComplete();
    };
  }, [pathname, searchParams]);
  return (
    <ChakraProvider value={system}>
      {loading ?? <LoadingSpinner />}
      <ColorModeProvider forcedTheme="light" {...props} />
    </ChakraProvider>
  )
}
