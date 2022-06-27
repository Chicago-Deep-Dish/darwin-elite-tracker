import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#36494E",
    },
    secondary: {
      main: "#141414",
      dark: "#000000",
      blueish: "#597081",
    },
  },
});



export default function Theme({ children }) {
  return (
    <ThemeProvider theme={(darkTheme)}>{children}</ThemeProvider>
  );
}
