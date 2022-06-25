import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#36494E'
    },
    secondary: {
      main: '#ffffff'
    },

  },
});

function Theme({children}) {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
}

export default Theme;