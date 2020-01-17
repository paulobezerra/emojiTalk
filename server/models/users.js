const mongoose = require('mongoose');

const Users = mongoose.model('User', new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    emoji: {type: String, required:true},
    socketId: {type:String, default: null}
})) 

module.exports = Users