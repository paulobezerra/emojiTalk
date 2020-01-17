const jwt = require('jsonwebtoken')
const userRepository = require('../models/usersRepository')

const extractJWT = async (socket) => {
    const token = socket.request._query['token']
    const user = await jwt.verify(token, 'TOP_SECRET')
    return user.username
}

module.exports = async (socket) => {
    try {
        const username = await extractJWT(socket)
        const user = await userRepository.findByUsername(username)
        user.socketId = socket.id
        await user.save()

        let users = await userRepository.findOnlineUsers()

        socket.broadcast.emit('onlineUsers', users)
        socket.emit('onlineUsers', users)
        console.log(`${user.username} connected...`)
    } catch (error) {
        console.log(error)
    }

    socket.on('sendMessage', async({
        fromUsername,
        toUsername,
        message
    }) => {
        const toUser = await userRepository.findByUsername(toUsername)
        socket.broadcast.to(toUser.socketId).emit('receiveMessage', {
            from: fromUsername,
            message
        })
    })

    socket.on('disconnect', async() => {
        try {
            const user = await userRepository.findBySocketId(socket.id)
            user.socketId = null
            await user.save()

            let users = await userRepository.findOnlineUsers()
            socket.broadcast.emit('onlineUsers', users)
            socket.emit('onlineUsers', users)
            console.log(`${user.username} disconnected...`)
        } catch (error) {
            console.log(error)
        }
    })
}