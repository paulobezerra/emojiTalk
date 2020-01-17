const Users = require('../models/users')

module.exports = {
    async findByUsername(username) {
        const user = await Users.findOne({
            username
        })

        return user
    },
    async findBySocketId(socketId) {
        const user = await Users.findOne({
            socketId
        })

        return user
    },
    async findOnlineUsers() {
        const users = await Users.find({
            socketId: {
                $ne: null
            }
        })

        return users.map(user => ({
            username: user.username,
            emoji: user.emoji
        }))
    }
}