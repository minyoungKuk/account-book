import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AccountForm from "../../components/AccountForm";
import Modal from "../../layouts/Modal";
import {
  closeAlertModal,
  setAlertMessage,
  setData,
} from "../../redux/slices/account.slice";

const AccountDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 80px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  input,
  select {
    width: 360px;
    padding: 10px 20px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 2px solid #354649;
  }
`;

const ButtonWrapper = styled.div`
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  button {
    width: 100px;
    padding: 15px;
    border: none;
    font-weight: 600;
    background-color: #354649;
    color: #e0e7e9;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      background-color: #6c7a89;
    }
  }
`;

const DetailPage = () => {
  const dispatch = useDispatch();
  const { data, isAlertModalVisible, alertMessage } = useSelector(
    (prevState) => prevState.account
  );

  const { detailId } = useParams();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  // const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const item = data.find((val) => val.id === detailId);
    if (item) {
      setSelectedData(item);
    }
  }, [detailId, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && !/^\d*$/.test(value)) {
      dispatch(setAlertMessage("금액란에는 숫자만 입력해 주세요."));
    } else {
      setSelectedData({ ...selectedData, [name]: value });
    }
  };

  const handleSave = () => {
    const updatedData = data.map((item) =>
      item.id === selectedData.id ? selectedData : item
    );

    // localStorage.setItem("accountData", JSON.stringify(updatedData));
    dispatch(setData(updatedData));
    navigate("/");
  };

  const showConfirmModal = (action) => {
    setConfirmAction(action);
    setIsConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalVisible(false);
    setConfirmAction(null);
  };

  // const closeAlertModal = () => {
  //   setIsAlertModalVisible(false);
  // };

  const confirmMessage =
    confirmAction === "save"
      ? "정말 수정하시겠습니까?"
      : "정말 삭제하시겠습니까?";

  const handleDeleteList = () => {
    const updatedData = data.filter((item) => item.id !== selectedData.id);
    // localStorage.setItem("accountData", JSON.stringify(updatedData));
    dispatch(setData(updatedData));
    navigate("/");
  };

  return (
    selectedData && (
      <AccountDetailWrapper>
        <AccountForm
          date={selectedData.date}
          category={selectedData.category}
          description={selectedData.description}
          amount={selectedData.amount}
          onChange={handleChange}
        />
        <ButtonWrapper>
          <button onClick={() => showConfirmModal("save")}>수정</button>
          <button onClick={() => showConfirmModal("delete")}>내역 삭제</button>
          <button onClick={() => navigate("/")}>돌아가기</button>
        </ButtonWrapper>

        <Modal
          show={isConfirmModalVisible}
          onClose={closeConfirmModal}
          message={confirmMessage}
          onConfirm={confirmAction === "save" ? handleSave : handleDeleteList}
        />

        <Modal
          show={isAlertModalVisible}
          onClose={() => dispatch(closeAlertModal())}
          message={alertMessage}
          onConfirm={() => dispatch(closeAlertModal())}
        />
      </AccountDetailWrapper>
    )
  );
};

export default DetailPage;
