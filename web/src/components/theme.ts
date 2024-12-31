import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
      semanticTokens: {
        colors: {
          blue: {
            solid: {
              value: { _light: "{colors.blue.600}", _dark: "#0284c7" }, // Custom dark blue
            },
            muted: {
              value: { _light: "{colors.blue.100}", _dark: "#082f49" }, // Custom dark muted blue
            },
          },
          // Add more color palettes as needed
        },
      },
    },
  })
  
  export const system = createSystem( config)