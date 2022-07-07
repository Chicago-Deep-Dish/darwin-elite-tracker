import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#597081",
      light: "#FFFFFF",
    },
    primary: {
      main: "#597081",
    },
    secondary: {
      main: "#000000",
    },
  },
});
export default function Theme({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
