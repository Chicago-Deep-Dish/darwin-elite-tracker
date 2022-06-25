import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import RecordLibrary from './pages/RecordLibrary'
import Nav from './components/Nav'
import Theme from './Context/ThemeContext';

export default function App() {
  return (
    <div className="App">
      <Theme>
        <Nav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/records' element={<RecordLibrary />} />
        </Routes>
      </Theme>
    </div>
  );
}
