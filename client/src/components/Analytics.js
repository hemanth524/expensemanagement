import React from "react";
import { Progress, Flex, Card, Tooltip, Typography } from "antd";
const { Text, Title } = Typography;

const Analytics = ({ transactions }) => {
  const categories = [
    "Food",
    "Rent",
    "Friend",
    "Bills",
    "Expenses",
    "College",
    "Medical",
    "Misc",
  ];

  //Filtering for progress bars
  const totalTransactions = transactions.length;
  const totalIncome = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  const totalExpense = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const incomePercent = Math.floor(
    (totalIncome.length / totalTransactions) * 100
  );
  const expensePercent = 100 - incomePercent;

  //Money Calculation
  const totalMoney = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const incomeMoney = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseMoney = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="graph">
      <Flex justify="center" className="mb-3">
        <Title level={3}>Total Transactions: {totalTransactions}</Title>
      </Flex>
      <Flex justify="space-evenly" wrap gap={"middle"}>
        <Card title="Incomes" hoverable style={{ width: 350 }}>
          <Flex justify="space-between">
            <Flex vertical align="center">
              <Title level={4}>Total Income Type:</Title>
              <Title level={2} type="success">
                {totalIncome.length}
              </Title>
            </Flex>
            <Tooltip
              color="green"
              title={`${totalIncome.length} of ${totalTransactions} total transactions.`}
            >
              <Progress
                type="circle"
                strokeColor={"#2CC900"}
                percent={incomePercent}
              />
            </Tooltip>
          </Flex>
        </Card>
        <Card title="Expenses" hoverable style={{ width: 350 }}>
          <Flex justify="space-between">
            <Flex vertical align="center">
              <Title level={4}>Total Expense Type:</Title>
              <Title level={2} type="danger">
                {totalExpense.length}
              </Title>
            </Flex>
            <Tooltip
              color="red"
              title={`${totalExpense.length} of ${totalTransactions} total transactions.`}
            >
              <Progress
                type="circle"
                strokeColor={"red"}
                percent={expensePercent}
              />
            </Tooltip>
          </Flex>
        </Card>
      </Flex>
      <br />
      <Flex justify="space-evenly" wrap gap={"middle"}>
        <Card title="Category-wise Income" hoverable style={{ width: 350 }}>
          {categories.map((category) => {
            const amount = transactions
              .filter(
                (transaction) =>
                  transaction.type === "Income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div>
                  <Title level={4}>{category}</Title>
                  <Progress
                    percent={((amount / incomeMoney) * 100).toFixed(0)}
                  />
                </div>
              )
            );
          })}
        </Card>
        <Card title="Category-wise Expense" hoverable style={{ width: 350 }}>
          {categories.map((category) => {
            const amount = transactions
              .filter(
                (transaction) =>
                  transaction.type === "Expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div>
                  <Title level={4}>{category}</Title>
                  <Progress
                    percent={((amount / expenseMoney) * 100).toFixed(0)}
                  />
                </div>
              )
            );
          })}
        </Card>
      </Flex>
      <br />
      <Flex justify="center" align="center">
        <Card hoverable style={{ width: 400 }}>
          <Flex justify="center" align="center" vertical>
            <Title level={4}>
              Total Income :{" "}
              <span style={{ color: "#2CC900" }}>{incomeMoney}</span>
            </Title>
            <Title level={4}>
              Total Expenditure :{" "}
              <span style={{ color: "red" }}>{expenseMoney}</span>
            </Title>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default Analytics;