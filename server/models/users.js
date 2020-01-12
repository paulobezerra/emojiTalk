const mongoose = require('mongoose');

const Users = mongoose.model('User', new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    emoji: {type: String, required:true}
})) 

module.exports = Users