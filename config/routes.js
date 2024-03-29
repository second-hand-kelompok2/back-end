const express = require("express");
var cors = require("cors");
const controllers = require("../app/controllers");
const auth = require("../app/middleware/auth");
var verify = require("../app/middleware/isLogin");
const multer = require("../app/middleware/multer");
const upload = require("../utils/upload");
const uploadOnMemory = require("../utils/memoryUpload");
const app = express();
const appRouter = express.Router();
const apiRouter = express.Router();
app.use(cors());
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// };

// app.use(allowCrossDomain);
// appRouter.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );
apiRouter.use(express.json());

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/posts", controllers.api.v1.post.list);
apiRouter.post("/api/v1/posts", controllers.api.v1.post.create);
apiRouter.put(
  "/api/v1/posts/:id",
  controllers.api.v1.post.setPost,
  controllers.api.v1.post.update
);
apiRouter.get(
  "/api/v1/posts/:id",
  controllers.api.v1.post.setPost,
  controllers.api.v1.post.show
);
apiRouter.delete(
  "/api/v1/posts/:id",
  controllers.api.v1.post.setPost,
  controllers.api.v1.post.destroy
);
//=========================================================================================================================
// user
apiRouter.get("/api/v1/users/", controllers.api.v1.userController.getUsers);
apiRouter.get(
  "/api/v1/users/:id",
  controllers.api.v1.userController.getUserById
);
apiRouter.post(
  "/api/v1/users/register",
  controllers.api.v1.userController.Register
);
apiRouter.post("/api/v1/users/login", controllers.api.v1.userController.Login);
apiRouter.post(
  "/api/v1/users/profile/update/:id",
  auth,
  multer.single("profile_img"),
  controllers.api.v1.userController.editUser
);

// product
apiRouter.get(
  "/api/v1/product/",
  controllers.api.v1.productController.getProduct
);
apiRouter.get(
  "/api/v1/product/:userid",
  controllers.api.v1.productController.getUserProduct
);
apiRouter.get(
  "/api/v1/product/info/:id",
  controllers.api.v1.productController.getInfoProduct
);
apiRouter.post(
  "/api/v1/product/filterByName",
  controllers.api.v1.productController.getProductByName
);
apiRouter.post(
  "/api/v1/product/filterByCategory",
  controllers.api.v1.productController.getProductByCategory
);
apiRouter.post(
  "/api/v1/product/add",
  uploadOnMemory.array("product_img", 4),
  auth,
  controllers.api.v1.productController.addProduct
);
apiRouter.post(
  "/api/v1/product/update/:id",
  auth,
  uploadOnMemory.array("product_img", 4),
  controllers.api.v1.productController.editProduct
);
apiRouter.delete(
  "/api/v1/product/delete/:id",
  auth,
  controllers.api.v1.productController.DeleteProduct
);

// transactions
apiRouter.post(
  "/api/v1/transaction/create",
  auth,
  controllers.api.v1.transactionController.createTransaction
);
apiRouter.post(
  "/api/v1/transaction/:id/accept",
  auth,
  controllers.api.v1.transactionController.acceptTransaction
);
apiRouter.post(
  "/api/v1/transaction/:id/refuse",
  auth,
  controllers.api.v1.transactionController.refuseTransaction
);
apiRouter.post(
  "/api/v1/transaction/:id/cancel",
  auth,
  controllers.api.v1.transactionController.cancelTransaction
);
apiRouter.post(
  "/api/v1/transaction/:id/end",
  auth,
  controllers.api.v1.transactionController.endTransaction
);
apiRouter.get(
  "/api/v1/transaction/sold-transaction/:userid",
  auth,
  controllers.api.v1.transactionController.getSoldTransaction
);
apiRouter.get(
  "/api/v1/notification/:userid",
  auth,
  controllers.api.v1.transactionController.getNotification
);
apiRouter.get(
  "/api/v1/wishlist/:userid",
  auth,
  controllers.api.v1.transactionController.getWishlist
);
apiRouter.delete(
  "/api/v1/transaction/delete",
  controllers.api.v1.transactionController.deleteAllTransaction
);

//buat cek aja
apiRouter.get(
  "/api/v1/transaction/all",
  controllers.api.v1.transactionController.getAllTransaction
);

//=================================================================================================================================

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
