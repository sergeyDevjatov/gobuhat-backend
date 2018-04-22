const mongoose = require('mongoose');
const _ = require('lodash');


let userSchema = mongoose.Schema({
    login: String,
    password: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
    },
});

userSchema.static('auth', async function (login, password) {
    const found = await this.findOne({
        login,
        password,
    });
    return found;
});

let User = mongoose.model('user', userSchema);

module.exports = User;