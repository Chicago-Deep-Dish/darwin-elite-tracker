import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import RecordLibrary from './pages/RecordLibrary'
import Theme from './Context/ThemeContext';
import Layout from './Layout';
import { GlobalContextProvider } from './Context/GlobalContext';
import { Box } from '@mui/material';

export default function App() {
  return (
    <div className="App">
      <Theme>
        <GlobalContextProvider>
          <Box sx={{ backgroundColor: 'secondary.blueish', height: '100vh', width: '100vw' }}>
            <Layout>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/records' element={<RecordLibrary />} />
              </Routes>
            </Layout>
          </Box>
        </GlobalContextProvider>
      </Theme>
    </div>
  );
}
