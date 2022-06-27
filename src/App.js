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
import Modal from "./components/common/Modal.jsx";

export default function App() {
  //------ MODAL ------//
  // By default, modal is an empty object {}
  // When using setModal, the syntax is setModal({ modalName, modalData })
  // modalName: Required; a string, decides which modal content to render
  // modalData: Optional; an object, should contain some data you need for the modal
  // Example 1 - setModal: line 14 @ './QuestionsAndAnswers/QAListEntry.jsx'
  // Example 2 - redernModal: line 8 @ './helper/Modals/Modals.jsx'
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
      <Modal modal={modal} />
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </div>
  );
}
