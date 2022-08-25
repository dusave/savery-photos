import { createTheme } from "@nextui-org/react"

const lightTheme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$purple200',
      primaryLightHover: '$purple300',
      primaryLightActive: '$purple400',
      primaryLightContrast: '$purple600',
      primary: '$purple600',
      primaryBorder: '$purple500',
      primaryBorderHover: '$purple600',
      primarySolidHover: '$purple700',
      primarySolidContrast: '$white',
      primaryShadow: '$purple500',
      background: '$purple900',
    },
    fonts: {
      primary: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
    }
  },
})

const darkTheme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$purple200',
      primaryLightHover: '$purple300',
      primaryLightActive: '$purple400',
      primaryLightContrast: '$purple600',
      primary: '$purple600',
      primaryBorder: '$purple500',
      primaryBorderHover: '$purple600',
      primarySolidHover: '$purple700',
      primarySolidContrast: '$white',
      primaryShadow: '$purple500',
      background: '$gray50',
    },
    fonts: {
      primary: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
    }
  }
})

export { darkTheme, lightTheme }