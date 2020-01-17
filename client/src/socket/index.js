import io from 'socket.io-client'

export default {
    socket: null,
    usersObservers: [],
    messagesObservers: [],
    users: [],
    addUsersObserver(callback) {
        this.usersObservers.push(callback)
    },
    addMessagesObserver(callback) {
        this.messagesObservers.push(callback)
    },
    addMessage(username, message, isSend) {
        const key = username + '_message'
        let messages = JSON.parse(localStorage.getItem(key))
        if (!messages) messages = []
        messages.push({
            message,
            isSend
        })
        localStorage.setItem(key, JSON.stringify(messages))
        this.messagesObservers.forEach(callback => callback(username, message, isSend))
    },
    getMessages(username) {
        const key = username + '_message'
        const messages = JSON.parse(localStorage.getItem(key))
        return messages ? messages : []
    },
    sendMessage(username, message) {
        this.addMessage(username, message, true)
        this.socket.emit('sendMessage', {
            fromUsername: localStorage.username,
            toUsername: username,
            message
        })
    },
    async init(token) {
        this.socket = io.connect("http://localhost:3000/", {
            query: `token=${token}`
        })
        this.socket.on('onlineUsers', (users) => {
            this.users = users.filter(user => user.username != localStorage.username)
            this.usersObservers.forEach(callback => callback(this.users))
        })

        this.socket.on('receiveMessage', ({from, message}) => this.addMessage(from, message, false))
    }
}
