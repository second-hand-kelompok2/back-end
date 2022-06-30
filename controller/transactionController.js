const { Notification, Product, Transaction } = require('../models')

// const { Op } = require('sequelize')

module.exports = class {
    static async newTransaction(req, res) {
        // const cekData = await Notification.findOne({ where: {from_userId: req.body.from_userId, product_id: req.body.product_id} })
        // const cekData = await Notification.findOne({ where: {product_id: req.body.product_id} })

        // if(cekData) {
        //     res.status(400).send({
        //         status: 400,
        //         message: 'Kamu telah mengajukan penawaran untuk produk ini!'
        //     })
        // }

        // else {
            const seller = await Product.findOne({ where: {id: req.body.product_id} });

            try {
                const result = await Notification.create({
                    from_userId: req.body.from_userId,
                    to_userId: seller['user_id'],
                    product_id: req.body.product_id,
                    req_price: req.body.req_price,
                    status: 'Pending',
                    isRead: false
                })
    
                res.status(201).json({
                    status: 201,
                    message: 'Tawaranmu berhasil dikirim!',
                    data: result
                })

            } catch (err) {
                console.log(err)
                res.send(err)
            }
        // }
    }

    static async getWishlist(req, res) {
        try {
            const result = await Notification.findAll({ where: {from_userId: req.params.userid} })
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

    static async getNotification(req, res) {
        try {
            const result = await Notification.findAll({ where: {to_userId: req.params.userid} })
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

    static async createTransaction(req, res) {
        try {
            const result = await Notification.update({
                status: 'Diterima',
                isRead: true
            }, { where: {id: req.body.notification_id} })

            res.status(201).json({
                status: 201,
                message: 'Tawaranmu diterima oleh penjual!'
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async refuseTransaction(req, res) {
        try {
            const result = await Notification.update({
                status: 'Ditolak',
                isRead: true
            }, { where: {id: req.body.notification_id} })

            res.status(201).json({
                status: 201,
                message: 'Tawaranmu ditolak oleh penjual.'
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getAllNotification(req, res) {
        try {
            const result = await Notification.findAll()
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

    static async saveTransactionHistory(req, res) {
        try {
            const update = await Notification.update({
                status: 'Selesai',
                isRead: true
            }, { where: {id: req.body.notification_id} })

            const result = await Transaction.create({
                seller_id: req.body.seller_id,
                buyer_id: req.body.buyer_id,
                product_id: req.body.product_id,
                status: 'Selesai'
            })

            res.status(201).json({
                status: 201,
                message: 'Histori transaksi telah disimpan.'
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async cancelTransactionHistory(req, res) {
        try {
            const update = await Transaction.update({
                status: 'Dibatalkan'
            }, { where: {id: req.body.transaction_id} })

            res.status(201).json({
                status: 201,
                message: 'Transaksi telah dibatalkan.'
            })
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getTransactionBuyer(req, res) {
        try {
            const result = await Transaction.findAll({ where: {buyer_id: req.params.userid} })
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

    static async getTransactionSeller(req, res) {
        try {
            const result = await Transaction.findAll({ where: {seller_id: req.params.userid} })
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