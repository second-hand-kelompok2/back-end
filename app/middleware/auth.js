const jwt = require("../helper/jwt");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const payload = jwt.verifyToken(req.headers.token);
    if (!payload) {
      res.status(404).send({ message: "user not found" });
    }

    const user = await User.findOne({
      where: { email: payload.email, password: payload.password },
    });
    if (!user) {
      res.status(404).send({ message: "user not found" });
    } else {
      req.userlogin = user.dataValues;
      next();
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
