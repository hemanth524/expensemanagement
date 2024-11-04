import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import dayjs from "dayjs";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Flex,
  InputNumber,
  ConfigProvider,
  message,
  Modal,
  Typography,
  Table,
  Tooltip,
} from "antd";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

const Homepage = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frequency, setFrequency] = useState("all");
  const [rangeDate, setRangeDate] = useState([]);
  const [type, setType] = useState("all");
  const [handleData, setHandleData] = useState("table");
  const [editable, setEditable] = useState(null);

  const delRecord = async (record) => {
    try {
      await axios.post("/api/v1/transactions/del-transaction", {
        transactionID: record._id,
      });
      message.success("Transaction Deleted");
      reloadPage();
    } catch (error) {
      console.log(error);
      message.error("Error deleting transaction");
    }
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => dayjs(text).format("DD-MMM-YYYY"),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Flex
          className="icons"
          justify="space-evenly"
          align="center"
          style={{ fontSize: "1.4rem" }}
        >
          <div>
            <EditFilled
              style={{ color: "#3faceb" }}
              className="mx-1"
              onClick={() => {
                setEditable(record);
                setIsModalOpen(true);
              }}
            />
          </div>
          <div>
            <DeleteFilled
              className="mx-1"
              style={{ color: "#fc2121" }}
              onClick={() => {
                delRecord(record);
              }}
            />
          </div>
        </Flex>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const reloadPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    const retrieveAll = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userID: user._id,
          frequency,
          rangeDate,
          type,
        });
        setAllTransactions(res.data);
      } catch (error) {
        console.log(error);
        message.error("Issue retrieving transactions");
      }
    };
    retrieveAll();
  }, [frequency, rangeDate, type]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userID: user._id,
          },
          transactionID: editable._id,
        });
        message.success("Transaction Updated");
      } else {
        const formattedVals = {
          ...values,
          userID: user._id,
        };

        await axios.post("/api/v1/transactions/add-transaction", formattedVals);
        message.success("Transaction Added");
        reloadPage();
      }

      setIsModalOpen(false);
      setEditable(null);
    } catch (error) {
      message.error("Failed to add Transaction");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="filters"></div>
      <div className="base">
        <Row>
          <Col span={16} offset={4}>
            <div
              style={{
                border: "2px solid gray",
                boxShadow: "0px 0px 3px 0 #0F110C",
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              <Title
                level={2}
                style={{
                  textAlign: "center",
                  textDecoration: "underline",
                  color: "#4B7F52",
                }}
              >
                Your Transactions
              </Title>
              <Flex justify="space-between" wrap gap={"middle"}>
                <Flex vertical>
                  <Text strong className="me-2 mb-2">
                    Date Filter
                  </Text>
                  <Flex vertical>
                    <Select
                      placeholder="Select Filter"
                      style={{ width: 150 }}
                      value={frequency}
                      onChange={(values) => setFrequency(values)}
                      options={[
                        {
                          value: "all",
                          label: "All",
                        },
                        {
                          value: "7",
                          label: "Last Week",
                        },
                        {
                          value: "30",
                          label: "Last Month",
                        },
                        {
                          value: "365",
                          label: "Last Year",
                        },
                        {
                          value: "custom",
                          label: "Custom",
                        },
                      ]}
                    ></Select>
                    {frequency === "custom" && (
                      <RangePicker
                        value={rangeDate}
                        onChange={(values) => setRangeDate(values)}
                      />
                    )}
                  </Flex>
                </Flex>
                <Flex vertical>
                  <Text strong className="me-2 mb-2">
                    Type Filter
                  </Text>
                  <Flex align="end">
                    <Select
                      placeholder="Select Type"
                      value={type}
                      onChange={(values) => setType(values)}
                      options={[
                        {
                          value: "all",
                          label: "All",
                        },
                        {
                          value: "Expense",
                          label: "Expense",
                        },
                        {
                          value: "Income",
                          label: "Income",
                        },
                      ]}
                      style={{ width: 150 }}
                    ></Select>
                  </Flex>
                </Flex>
                <Flex align="end">
                  <Button
                    type="primary"
                    ghost
                    shape="round"
                    size="large"
                    onClick={showModal}
                  >
                    Add Transaction
                  </Button>
                </Flex>
              </Flex>
            </div>
            <Modal
              centered
              title={editable ? "Edit Transaction" : "Add Transaction"}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                  ...editable,
                  date: editable?.date ? dayjs(editable.date) : null,
                }}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      InputNumber: {
                        controlWidth: { xs: 50, sm: 70, md: 90, lg: 120 },
                      },
                    },
                  }}
                >
                  <Form.Item
                    label="Amount"
                    name={"amount"}
                    rules={[{ required: true, message: "Enter Amount" }]}
                  >
                    <InputNumber
                      min={0}
                      autoFocus
                      allowClear="true"
                      autoComplete="off"
                      size="large"
                      changeOnWheel
                    />
                  </Form.Item>
                </ConfigProvider>
                <Form.Item
                  label="Type"
                  name={"type"}
                  rules={[
                    { required: true, message: "Select type of expense" },
                  ]}
                >
                  <Select
                    defaultValue={"Select"}
                    options={[
                      {
                        value: "Expense",
                        label: "Expense",
                      },
                      {
                        value: "Income",
                        label: "Income",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name={"category"}
                  rules={[{ required: true, message: "Select category" }]}
                >
                  <Select
                    defaultValue={"Select"}
                    options={[
                      {
                        value: "Food",
                        label: "Food",
                      },
                      {
                        value: "Rent",
                        label: "Rent",
                      },
                      {
                        value: "Friend",
                        label: "Friend",
                      },
                      {
                        value: "Bills",
                        label: "Bills",
                      },
                      {
                        value: "Expenses",
                        label: "Expenses",
                      },
                      {
                        value: "College",
                        label: "College",
                      },
                      {
                        value: "Medical",
                        label: "Medical",
                      },
                      {
                        value: "Misc",
                        label: "Misc",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                  <Input type="String" autoComplete="off" allowClear="true" />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name={"date"}
                  rules={[{ required: true, message: "Date is not mentioned" }]}
                >
                  <DatePicker format={"DD-MMM-YYYY"} />
                </Form.Item>
                <Flex justify="end">
                  <Button
                    type="primary"
                    ghost
                    shape="round"
                    htmlType="submit"
                    size="large"
                  >
                    {editable ? "Edit" : "Add"}
                  </Button>
                </Flex>
              </Form>
            </Modal>
          </Col>
        </Row>
        <br /> <br />
        <Row>
          <Col span={16} offset={4}>
            <Flex justify="end">
              <div className="data-icons">
                <Tooltip title="Tabular View" color="blue">
                  <UnorderedListOutlined
                    className={`me-2 ${
                      handleData === "table" ? "active-icon" : "inactive-icon"
                    }`}
                    onClick={() => setHandleData("table")}
                  />
                </Tooltip>
                <Tooltip title="Graphical View" color="blue">
                  <AreaChartOutlined
                    className={`ms-2 ${
                      handleData === "graph" ? "active-icon" : "inactive-icon"
                    }`}
                    onClick={() => setHandleData("graph")}
                  />
                </Tooltip>
              </div>
            </Flex>
            {handleData === "table" ? (
              <Table
                columns={columns}
                dataSource={allTransactions}
                bordered
                size="large"
                style={{ boxShadow: "0px 0px 5px 0 #0F110C" }}
                pagination={{ pageSize: 5 }}
              />
            ) : (
              <Analytics transactions={allTransactions} />
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Homepage;