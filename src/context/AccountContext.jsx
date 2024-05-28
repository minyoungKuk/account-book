import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import mockData from "../data/mockData";

const AccountContext = createContext();

// eslint-disable-next-line react/prop-types
export const AccountProvider = ({ children }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("accountData")) || []
  );
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("accountData"));

    if (storedData && storedData.length > 0) {
      setData(storedData);
    } else {
      setData(mockData);
      localStorage.setItem("accountData", JSON.stringify(mockData));
    }
  }, []);

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
    <AccountContext.Provider
      value={{
        data,
        setData,
        date,
        setDate,
        category,
        setCategory,
        description,
        setDescription,
        amount,
        setAmount,
        currentMonth,
        setCurrentMonth,
        handleSubmit,
        handleAmountChange,
        isAlertModalVisible,
        alertMessage,
        setAlertMessage,
        closeAlertModal,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
