var express = require("express");
var router = express.Router();
var transaction = require("../controller/transactionController");
// var verify = require("../middleware/isLogin");
const auth = require("../middleware/auth");

router.post("/new-transaction", auth, transaction.newTransaction)
router.get("/wishlist/:userid", auth, transaction.getWishlist)
router.get("/notification/:userid", auth, transaction.getNotification)
router.post("/accept-transaction", auth, transaction.createTransaction)
router.post("/refuse-transaction", auth, transaction.refuseTransaction)
router.post("/save", auth, transaction.saveTransactionHistory)
router.post("/cancel", auth, transaction.cancelTransactionHistory)
router.get("/get-buyer-transaction/:userid", auth, transaction.getTransactionBuyer)
router.get("/get-seller-transaction/:userid", auth, transaction.getTransactionSeller)

//buat cek aja
router.get("/all-notification", transaction.getAllNotification)

module.exports = router;