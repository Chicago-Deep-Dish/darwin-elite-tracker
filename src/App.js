//import modules/css
import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./Context/GlobalContext";


//component imports
import HomePage from "./pages/Homepage";
import RecordLibrary from "./pages/RecordLibrary";
import Theme from "./Context/ThemeContext";
import Layout from "./Layout";
import { CssBaseline } from "@mui/material";


export default function App() {


  return (
    <div className="App">
      <Theme>
        <CssBaseline>
          <GlobalContextProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/records" element={<RecordLibrary />} />
              </Routes>
            </Layout>
          </GlobalContextProvider>
        </CssBaseline>
      </Theme>

    </div>
  );
}
