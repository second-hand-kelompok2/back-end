const { Product, Image, Transaction } = require("../../../models");

// const { Op } = require('sequelize')

module.exports = class {
  static async createTransaction(req, res) {
    const cekData = await Transaction.findOne({
      where: { buyerId: req.body.buyerId, product_id: req.body.product_id },
    });
    //const cekData = await Product.findOne({ where: {user_id: req.body.sllerId} })

    if (cekData) {
      res.status(400).send({
        status: 400,
        message: "Kamu telah mengajukan penawaran untuk produk ini!",
      });
    } else {
      try {
        const result = await Transaction.create({
          buyerId: req.body.buyerId,
          sllerId: req.body.sllerId,
          product_id: req.body.product_id,
          req_price: req.body.req_price,
          status: "Pending",
          isRead: false,
        });

        res.status(201).json({
          status: 201,
          message: "Tawaran berhasil dikirim!",
          data: result,
        });
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    }
  }

  static async acceptTransaction(req, res) {
    try {
      const result = await Transaction.update(
        {
          status: "Diterima",
          isRead: true,
        },
        { where: { id: req.params.id } }
      );

      res.status(201).json({
        status: 201,
        message: "Tawaran telah diterima!",
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async refuseTransaction(req, res) {
    try {
      const result = await Transaction.update(
        {
          status: "Ditolak",
          isRead: true,
        },
        { where: { id: req.params.id } }
      );

      res.status(201).json({
        status: 201,
        message: "Tawaran ditolak.",
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async cancelTransaction(req, res) {
    try {
      const update = await Transaction.update(
        {
          status: "Dibatalkan",
        },
        { where: { id: req.params.id } }
      );

      res.status(201).json({
        status: 201,
        message: "Transaksi telah dibatalkan.",
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async endTransaction(req, res) {
    try {
      const update = await Transaction.update(
        {
          status: "Selesai",
        },
        { where: { id: req.params.id } }
      );

      res.status(201).json({
        status: 201,
        message: "Transaksi telah selesai.",
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async getSoldTransaction(req, res) {
    try {
      //const result = await Transaction.findAll({ where: {sllerId: req.params.userid, status: "Selesai"} })
      const result = await Transaction.findAll({
        where: { sllerId: req.params.userid },
      });
      res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async getNotification(req, res) {
    try {
      const result = await Transaction.findAll({
        include: [
          {
            model: Product,
          },
          {
            model: Images,
          },
        ],
        where: { sllerId: req.params.userid, isRead: false },
      });
      res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async getWishlist(req, res) {
    try {
      const result = await Transaction.findAll({
        include: [
          {
            model: Product,
          },
        ],
        where: { buyerId: req.params.userid },
      });

      res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async getAllTransaction(req, res) {
    try {
      const result = await Transaction.findAll();
      res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async deleteAllTransaction(req, res) {
    try {
      await Transaction.destroy({
        truncate: true,
      });
      res.status(200).json({
        status: 200,
        message: "Seluruh data transaksi telah dihapus",
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
};
