import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import RecordLibrary from './pages/RecordLibrary'
import Theme from './Context/ThemeContext';
import Layout from './Layout';
import { GlobalContextProvider } from './Context/GlobalContext';
import MenueBar from './components/HomePage/HomeGraphs/MenueBar.js'

export default function App() {
  return (
    <div className="App">
      <Theme>
        <GlobalContextProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/records' element={<RecordLibrary />} />
              </Routes>
              <MenueBar/>
            </Layout>

        </GlobalContextProvider>
      </Theme>
    </div>
  );
}
