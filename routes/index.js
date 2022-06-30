var express = require("express");
var router = express.Router();
var product = require("../controller/productController");
var verify = require("../middleware/isLogin");
const multer = require("../middleware/multer");

/*users. */
router.use("/users", require("./users"));

/* transaction */
router.use("/transaction", require("./transaction"));

/* PRODUCT*/
router.use("/product", require("./product"));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});



module.exports = router;
