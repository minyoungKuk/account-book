import React from "react";
import styled from "styled-components";

const StyledHeaderWrap = styled.div`
  width: 100%;
  height: 80px;
  background-color: #e0e7e9;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  font-style: normal;

  h1 {
    color: #354649;
    font-size: 24px;
  }
`;

function Header({ currentMonth, setCurrentMonth }) {
  const handlePreviousMonth = () => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(nextMonth);
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <StyledHeaderWrap>
      <h1>Account B</h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/src/assets/images/ic-arrow-left.png"
          style={{ width: "30px", padding: "4px", cursor: "pointer" }}
          onClick={handlePreviousMonth}
        />
        <p style={{ padding: "0px 10px" }}>
          {monthNames[currentMonth.getMonth()]}
        </p>
        <img
          src="/src/assets/images/ic-arrow-right.png"
          style={{ width: "30px", padding: "4px", cursor: "pointer" }}
          onClick={handleNextMonth}
        />
      </div>
    </StyledHeaderWrap>
  );
}

export default Header;
