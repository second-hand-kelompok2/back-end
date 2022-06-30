var express = require("express");
var router = express.Router();
var transaction = require("../controller/transactionController");
var verify = require("../middleware/isLogin");

router.post("/new-transaction", verify.auth, transaction.newTransaction)
router.get("/wishlist/:userid", verify.auth, transaction.getWishlist)
router.get("/notification/:userid", verify.auth, transaction.getNotification)
router.post("/accept-transaction", verify.auth, transaction.createTransaction)
router.post("/refuse-transaction", verify.auth, transaction.refuseTransaction)
router.post("/save", verify.auth, transaction.saveTransactionHistory)
router.post("/cancel", verify.auth, transaction.cancelTransactionHistory)
router.get("/get-buyer-transaction/:userid", verify.auth, transaction.getTransactionBuyer)
router.get("/get-seller-transaction/:userid", verify.auth, transaction.getTransactionSeller)

//buat cek aja
router.get("/all-notification", transaction.getAllNotification)

module.exports = router;