import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#597081',
    },
    primary: {
      main: '#36494E',
    },
    secondary: {
      main: '#141414',
      dark: '#000000',
      blueish: '#597081',
    },
  },
});

export default function Theme({children}) {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
}
