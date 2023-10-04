import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    colors: {
      lightYellow: "#FFF2CC",
      lightAsh: "#FFFFFF",
      reds: "#FD1515",
      mediumYellow: "#FDB815",
      greene: "#009E19",
      transparentGreen: "#009E1950",
    },
    primary: {
      main: "#4083D4",
      light: "#399AF4",
      lightGray: "#F8F8F8",
      mediumGray: "#C2C2C2",
      dark: "#344248",
      darkYellow: "#FDB815",
      orangeYellow: "#FBB900",
      lightGrey: "#FFFFFF",
    },
    secondary: {
      light: "#F58220",
      main: "#0044ff",
      mediumOrange: "#ffcc00",
      mediumGray: "#E3E3E3",
    },
    background: {
      main: "#FFFFFF",
      secondary: "#7cabf466",
      bottomNav: "rgba(34, 51, 68, 0.8)",
    },
  },
  typography: {
    fontFamily: "Gotham",
  },
});
