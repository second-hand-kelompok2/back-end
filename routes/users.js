var express = require("express");
var router = express.Router();
const userControl = require("../controller/userController");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

/* GET users. */
router.get("/", userControl.getUsers);
router.post("/register", userControl.Register);
router.post("/login", userControl.Login);
router.post(
  "/profile/update/:id",
  auth,
  multer.single("profile_img"),
  userControl.editUser
);
// });

module.exports = router;
