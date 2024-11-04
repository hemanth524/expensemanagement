const express = require("express");
const {
  retrieveAll,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactioncontro");

const router = express.Router();

router.post("/add-transaction", addTransaction);

router.post("/edit-transaction", editTransaction);

router.post("/del-transaction", deleteTransaction);

router.post("/get-transaction", retrieveAll);

module.exports = router;