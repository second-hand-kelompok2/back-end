const { Product, Image, User } = require("../../../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const multer = require("../../../middleware/multer");
const cloudinary = require("../../../../utils/cloudinary");
const { promisify } = require("util");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = class {
  static async getProduct(req, res) {
    try {
      const result = await Product.findAll({
        include: [
          {
            model: Image,
          },
        ],
        order: [
          ["createdAt", "DESC"],
          [{ model: Image }, "createdAt", "DESC"],
        ],
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

  static async getUserProduct(req, res) {
    try {
      const result = await Product.findAll({
        where: { user_id: req.params.userid },
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

  static async getProductByName(req, res) {
    try {
      const result = await Product.findAll({
        where: {
          product_name: { [Op.like]: "%" + req.body.productName + "%" },
        },
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

  static async getProductByCategory(req, res) {
    try {
      const result = await Product.findAll({
        where: { product_category: req.body.category },
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

  static async getInfoProduct(req, res) {
    const cekData = await Product.findOne({ include: [
      {
        model: User,
      },
    ],
    where: { id: req.params.id } });

    if (!cekData) {
      res.status(400).send({
        status: 400,
        message: "Produk tidak ditemukan!",
      });
    } else {
      try {
        const result = await Product.findAll({ where: { id: req.params.id } });
        res.status(200).json({
          status: 200,
          data: result,
        });
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    }
  }

  static async addProduct(req, res) {
    try {
      let fotoProduk = [];
      let fileBase64 = [];
      let file = [];
      const cekData = await Product.findOne({
        where: { product_name: req.body.product_name },
      });

      if (cekData) {
        res.status(400).send({
          status: 400,
          message: "Nama produk tidak boleh sama!",
        });
      } else {
        // const result = await cloudinaryUpload(req.file.path);
        const productCreated = await Product.create({
          user_id: req.body.user_id,
          product_name: req.body.product_name,
          product_category: req.body.product_category,
          product_desc: req.body.product_desc,
          product_price: req.body.product_price,
          location: req.body.location,
          status: req.body.status,
        });
        for (var i = 0; i < req.files.length; i++) {
          fileBase64.push(req.files[i].buffer.toString("base64"));
          file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
          const result = await cloudinaryUpload(file[i]);
          fotoProduk.push(result.secure_url);
          await Image.create({
            product_id: productCreated.id,
            product_img: fotoProduk[i],
          });
        }
        const response_data = await Product.findByPk(productCreated.id, {
          include: [
            {
              model: Image,
            },
          ],
        });
        res.status(201).json({
          message: "Product Created",
          data: response_data,
        });
        // res.status(201).json({
        //   status: 201,
        //   message: "Data produk telah disimpan!",
        //   data: productCreated,
        // });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async editProduct(req, res) {
    const cekData = await Product.findOne({ where: { id: req.params.id } });

    if (!cekData) {
      res.status(400).send({
        status: 400,
        message: "Produk tidak ditemukan!",
      });
    } else {
      try {
        let fotoProduk = [];
        let fileBase64 = [];
        let file = [];
        const id = req.params.id;
        await Product.update(
          {
            user_id: req.body.user_id,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_desc: req.body.product_desc,
            product_price: req.body.product_price,
            thumbnail: req.body.thumbnaill,
            location: req.body.location,
            status: req.body.status,
          },
          { where: { id: req.params.id } }
        );
        const productPic = await Image.findAll({
          where: {
            product_id: id,
          },
        });
        let cloudImage;

        if (req.files.length > 0) {
          if (productPic.length > 0) {
            for (var i = 0; i < productPic.length; i++) {
              cloudImage = productPic[i].product_img.substring(62, 82);
              cloudinaryDestroy(cloudImage);
            }
          }
          await Image.destroy({
            where: {
              product_id: id,
            },
          });
          for (var i = 0; i < req.files.length; i++) {
            fileBase64.push(req.files[i].buffer.toString("base64"));
            file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
            const result = await cloudinaryUpload(file[i]);
            fotoProduk.push(result.secure_url);
            await Image.create({
              product_id: id,
              product_img: fotoProduk[i],
            });
          }
        }

        res.status(201).json({
          status: 201,
          message: "Informasi produk telah diperbarui!",
        });
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    }
  }
  static async DeleteProduct(req, res) {
    const cekData = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!cekData) {
      res.status(400).send({
        status: 400,
        message: "Tidak Ada Produk!",
      });
    } else {
      try {
        const id = req.params.id;

        const productPic = await Image.findAll({
          where: {
            product_id: id,
          },
        });
        let cloudImage;

        if (productPic.length > 0) {
          for (var i = 0; i < productPic.length; i++) {
            cloudImage = productPic[i].product_img.substring(62, 82);
            cloudinaryDestroy(cloudImage);
          }
        }
        await Image.destroy({
          where: {
            product_id: id,
          },
        });
        await Product.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).json({
          message: "Product Deleted",
        });
      } catch (error) {
        res.status(400).json({
          error: error.message,
        });
      }
    }
  }
};
