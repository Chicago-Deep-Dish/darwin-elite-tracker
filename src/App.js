//import modules/css
import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";

//component imports
import HomePage from "./components/HomePage";
import RecordLibrary from "./components/RecordLibraryPage";
import Theme from "./context/ThemeContext.js";
import Layout from "./Layout";
import { CssBaseline } from "@mui/material";
import Footer from "./components/common/Footer/Footer";

export default function App() {
  return (
    <div
      className="App"
      style={{ minHeight: 600, marginBottom: 200, clear: "both" }}
    >
      <Theme>
        <CssBaseline>
          <GlobalContextProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/records" element={<RecordLibrary />} />
              </Routes>
              <Footer />
            </Layout>
          </GlobalContextProvider>
        </CssBaseline>
      </Theme>
    </div>
  );
}
