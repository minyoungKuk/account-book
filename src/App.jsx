import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./layouts/Header";
import Modal from "./layouts/Modal";
import { closeAlertModal } from "./redux/slices/account.slice";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const { isAlertModalVisible, alertMessage } = useSelector(
    (prevState) => prevState.account
  );
  const dispatch = useDispatch();

  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Modal
        show={isAlertModalVisible}
        onClose={() => dispatch(closeAlertModal())}
      >
        <p>{alertMessage}</p>
        <button onClick={() => dispatch(closeAlertModal())}>확인</button>
      </Modal>
    </>
  );
};

export default App;
