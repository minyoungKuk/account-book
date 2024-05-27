import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styled from "styled-components";

const PieChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const colors = {
  living: "#1abc9c",
  food: "#f39c12",
  transport: "#3498db",
  shopping: "#e74c3c",
  culture: "#9b59b6",
  others: "#7f8c8d",
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = ({ data }) => {
  const categoryData = data.reduce((acc, curr) => {
    if (acc[curr.category]) {
      acc[curr.category] += Number(curr.amount);
    } else {
      acc[curr.category] = Number(curr.amount);
    }
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
    color: colors[key],
  }));

  return (
    <PieChartWrap>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </PieChartWrap>
  );
};

export default PieChartComponent;
