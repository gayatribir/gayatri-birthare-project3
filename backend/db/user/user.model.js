const mongoose = require("mongoose")

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model("UserModel", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({userName: username}).exec();
}

function findUsers() {
    return UserModel.find().exec();
}

module.exports = {
    createUser,
    findUserByUsername,
    findUsers
}