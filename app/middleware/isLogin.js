const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('token')
    
    if(!token) { return res.status(401).send('Silahkan login terlebih dahulu!') }

    try {
        // const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
        // req.user = verifikasi
        next()
    }

    catch(err) {
        res.status(400).send('Invalid token!')
    }
}

module.exports = {auth}