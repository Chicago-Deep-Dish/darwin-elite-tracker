//import modules/css
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

//component imports
import HomePage from "./pages/Homepage";
import RecordLibrary from "./pages/RecordLibrary";
import Theme from "./Context/ThemeContext";
import Layout from "./Layout";
import PopupModal from "./components/common/PopupModal.jsx";

export default function App() {
  const [modal, setModal] = useState({});

  return (
    <div className="App">
      <Theme>
        <Layout setModal={setModal}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/records" element={<RecordLibrary />} />
          </Routes>
        </Layout>
      </Theme>
      <PopupModal modal={modal} setModal={setModal} />
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </div>
  );
}
