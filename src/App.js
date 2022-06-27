import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/Homepage';
import RecordLibrary from './pages/RecordLibrary'
import Theme from './Context/ThemeContext';
import Layout from './Layout';
import { GlobalContextProvider } from './Context/GlobalContext';

export default function App() {
  return (
    <div className="App">
      <Theme>
        <CssBaseline>
        <GlobalContextProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/records' element={<RecordLibrary />} />
              </Routes>
            </Layout>
        </GlobalContextProvider>
        </CssBaseline>
      </Theme>
    </div>
  );
}
