
const dayjs = require("dayjs");
const transactionModel = require("../modules/transaction");

const retrieveAll = async (req, res) => {
  try {
    const { frequency = "all", userID, rangeDate, type = "all" } = req.body;
    let query = { userID: userID };

    if (frequency !== "all" && frequency !== "custom") {
      const frequencyNumber = Number(frequency);

      //Verify if given frequency is valid
      if (isNaN(frequencyNumber)) {
        return res.status(400).json({ error: "Invalid frequency value" });
      }

      //Subtracts current date with frequency considering only day
      const dateThreshold = dayjs().subtract(frequencyNumber, "day").toDate();

      if (isNaN(dateThreshold.getTime())) {
        return res.status(400).json({ error: "Invalid date threshold" });
      }

      query.date = { $gte: dateThreshold };
    } else if (frequency === "custom" && rangeDate && rangeDate.length === 2) {
      //Setup for custom time series length
      const startDate = new Date(rangeDate[0]);
      const endDate = new Date(rangeDate[1]);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Invalid custom date range" });
      }

      //$gte for >=, similarly lte
      query.date = { $gte: startDate, $lte: endDate };
    }

    //Type filter
    if (type !== "all") {
      query.type = type;
    }

    const transactions = await transactionModel.find(query);

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Added");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionID });
    res.status(200).send("Transaction Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionID },
      req.body.payload
    );
    res.status(200).send("Edit Successful");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  retrieveAll,
  addTransaction,
  editTransaction,
  deleteTransaction,
};