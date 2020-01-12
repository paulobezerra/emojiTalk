const Users = require('../../models/users')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(400).json({msg: "Access token not informed..."})
        }

        const token = req.headers['authorization'].split(' ')
        
        if (token[0] !== 'Bearer') {
            return res.status(400).json({msg: "Access token entered but in invalid format..."})
        }

        const user = await jwt.verify(token[1], 'TOP_SECRET')
        req.body.user = await Users.findOne({username: user.username})

        next()
        
    } catch (error) {
        return res.status(400).json({msg: "Could not validate token..."})
    }
}