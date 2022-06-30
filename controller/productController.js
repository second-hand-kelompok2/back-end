const { Product } = require('../models')
const { Op } = require('sequelize')

module.exports = class {
    static async getProduct(req, res) {
        try {
            const result = await Product.findAll()
            res.status(200).json({
                status: 200,
                data: result
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getUserProduct(req, res) {
        try {
            const result = await Product.findAll({ where: {user_id: req.params.userid} })
            res.status(200).json({
                status: 200,
                data: result
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getProductByName (req, res) {
        try {
            const result = await Product.findAll({ where: { product_name: {[Op.like]: '%' + req.body.productName + '%'}} })
            res.status(200).json({
                status: 200,
                data: result
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getProductByCategory(req, res) {
        try {
            const result = await Product.findAll({ where: { product_category: req.body.category } })
            res.status(200).json({
                status: 200,
                data: result
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getInfoProduct(req, res) {
        const cekData = await Product.findOne({ where: {id: req.params.id} })

        if(!cekData) {
            res.status(400).send({
                status: 400,
                message: 'Produk tidak ditemukan!'
            })
        }

        else {
            try {
                const result = await Product.findAll({ where: {id: req.params.id} })
                res.status(200).json({
                    status: 200,
                    data: result
                })
            }
    
            catch(err) {
                console.log(err)
                res.send(err)
            }
        }
    }

    static async addProduct(req, res) {
        try {
            const cekData = await Product.findOne({ where: {product_name: req.body.product_name} })

            if(cekData) {
                res.status(400).send({
                    status: 400,
                    message: 'Nama produk tidak boleh sama!'
                })
            }

            else {
                const result = await Product.create({
                    user_id: req.body.user_id,
                    product_name: req.body.product_name,
                    product_category: req.body.product_category,
                    product_desc: req.body.product_desc,
                    product_price: req.body.product_price,
                    product_img: req.file.path,
                    location: req.body.location,
                    status: req.body.status
                })

                res.status(201).json({
                    status: 201,
                    message: 'Data produk telah disimpan!',
                    data: result
                })
            }
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editProduct(req, res) {
        const cekData = await Product.findOne({ where: {id: req.params.id} })

        if(!cekData) {
            res.status(400).send({
                status: 400,
                message: 'Produk tidak ditemukan!'
            })
        }

        else {
            try {
                await Product.update({
                    user_id: req.body.user_id,
                    product_name: req.body.product_name,
                    product_category: req.body.product_category,
                    product_desc: req.body.product_desc,
                    product_price: req.body.product_price,
                    product_img: req.file.path,
                    location: req.body.location,
                    status: req.body.status
                }, { where: {id: req.params.id} })

                res.status(201).json({
                    status: 201,
                    message: "Informasi produk telah diperbarui!"
                })
            }

            catch(err) {
                console.log(err)
                res.send(err)
            }
        }
    }
    static async DeleteProduct(req, res) {
        const cekData = await Product.findOne({ where: {id: req.params.id, isDelete: true, deletedBy: req.user_id} })

        if(!cekData) {
            res.status(400).send({
                status: 400,
                message: 'Tidak Ada Produk!'
            })
        }

        else {
            try {
                await Product.delete({
                    user_id: req.body.user_id,
                    product_name: req.body.product_name,
                    product_category: req.body.product_category,
                    product_desc: req.body.product_desc,
                    product_price: req.body.product_price,
                    product_img: req.body.product_img,
                    location: req.body.location,
                    status: req.body.status
                }, { where: {id: req.params.id} })

                res.status(201).json({
                    status: 201,
                    message: "Produk telah dihapus!"
                })
            }

            catch(err) {
                console.log(err)
                res.send(err)
            }
        }
    }
}