import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import mockData from "./data/mockData";
import Header from "./layouts/Header";
import Modal from "./layouts/Modal";
import DetailPage from "./pages/DetailPage/DetailPage";
import HomePage from "./pages/HomePage/HomePage";
import "./styles/App.scss";

function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("accountData"))
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("accountData"));
    console.log(storedData);

    setData(mockData);
    localStorage.setItem("accountData", JSON.stringify(mockData));
  }, []);

  //   if (storedData) {
  //     setData(storedData);
  //     localStorage.setItem("accountData", JSON.stringify(storedData));
  //   }
  // }, []);

  console.log(data);

  const handleSubmit = () => {
    if (!date || !category || !description || !amount) {
      setAlertMessage("모든 입력칸을 채워주세요.");
      setIsAlertModalVisible(true);
      return;
    }

    const newData = {
      id: uuidv4(),
      date,
      category,
      description,
      amount,
    };

    const updateData = [...data, newData];

    localStorage.setItem("accountData", JSON.stringify(updateData));

    setData(updateData);

    setDate("");
    setCategory("");
    setDescription("");
    setAmount("");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    } else {
      setAlertMessage("금액란에는 숫자만 입력해 주세요.");
      setIsAlertModalVisible(true);
    }
  };

  const closeAlertModal = () => {
    setIsAlertModalVisible(false);
  };

  return (
    <Router>
      <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              date={date}
              setDate={setDate}
              category={category}
              setCategory={setCategory}
              description={description}
              setDescription={setDescription}
              amount={amount}
              setAmount={setAmount}
              data={data}
              setData={setData}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              handleSubmit={handleSubmit}
              handleAmountChange={handleAmountChange}
            />
          }
        />
        <Route
          path="/detail/:detailId"
          element={<DetailPage data={data} setData={setData} />}
        />
      </Routes>

      <Modal show={isAlertModalVisible} onClose={closeAlertModal}>
        <p>{alertMessage}</p>
        <button onClick={closeAlertModal}>확인</button>
      </Modal>
    </Router>
  );
}

export default App;
