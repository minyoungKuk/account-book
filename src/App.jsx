import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AccountContext from "./context/AccountContext";
import Header from "./layouts/Header";
import Modal from "./layouts/Modal";
import "./styles/App.scss";

const App = () => {
  const { isAlertModalVisible, alertMessage, closeAlertModal } =
    useContext(AccountContext);

  return (
    <>
      <Header />
      <Outlet />
      <Modal show={isAlertModalVisible} onClose={closeAlertModal}>
        <p>{alertMessage}</p>
        <button onClick={closeAlertModal}>확인</button>
      </Modal>
    </>
  );
};

export default App;
