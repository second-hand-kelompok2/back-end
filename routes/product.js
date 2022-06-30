var express = require("express");
var router = express.Router();
var product = require("../controller/productController");
var verify = require("../middleware/isLogin");
const multer = require("../middleware/multer");

router.get("/", product.getProduct);
router.get("/:userid", product.getUserProduct);
router.get("/info/:id", product.getInfoProduct);
router.post("/filterByName", product.getProductByName);
router.post("/filterByCategory", product.getProductByCategory);
router.post(
  "/add",
  verify.auth,
  multer.single("product_img"),
  product.addProduct
);
router.post(
  "/:id",
  verify.auth,
  multer.single("product_img"),
  product.editProduct
);
router.delete("/:id", verify.auth, product.DeleteProduct);

module.exports = router;
