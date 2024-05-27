import React from "react";
import styled from "styled-components";

const AccountFormListTitle = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #354649;
  font-weight: 600;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const AccountForm = ({ date, category, description, amount, onChange }) => {
  return (
    <>
      <div>
        <AccountFormListTitle>일자</AccountFormListTitle>
        <input type="date" name="date" value={date} onChange={onChange} />
      </div>
      <div>
        <AccountFormListTitle>분류</AccountFormListTitle>
        <select name="category" value={category} onChange={onChange}>
          <option value="">선택하세요</option>
          <option value="living">생활비</option>
          <option value="food">식비</option>
          <option value="transport">교통비</option>
          <option value="shopping">쇼핑</option>
          <option value="culture">문화/여가</option>
          <option value="others">기타</option>
        </select>
      </div>
      <div>
        <AccountFormListTitle>내용</AccountFormListTitle>
        <input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
        />
      </div>
      <div>
        <AccountFormListTitle>금액</AccountFormListTitle>
        <input type="number" name="amount" value={amount} onChange={onChange} />
      </div>
    </>
  );
};

export default AccountForm;
