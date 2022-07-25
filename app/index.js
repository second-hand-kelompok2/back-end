/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const router = require("../config/routes");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "./views");
const app = express();

app.use(cors());
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//   next();
// };

// app.use(allowCrossDomain);

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );

/** Install View Engine */
app.set("views", viewsDir);
app.set("view engine", "ejs");

/** Set Public Directory */
app.use(express.static(publicDir));

/** Install Router */
app.use(router);

module.exports = app;
