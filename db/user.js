const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');


Date.afterThreeDays = function () {
    const THREE_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 3;
    return Date.now() + THREE_DAYS_IN_MILLISECONDS;
};

let userSchema = mongoose.Schema({
    login: String,
    password: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
    },
    token: {
        value: String,
        expire: {
            type: Date,
            default: Date.afterThreeDays,
        },
        default: {},
    },
});

userSchema.static('auth', async function (login, password) {
    const newToken = crypto.createHash('sha256').update(Date.now() + login).digest('hex');
    return await this.findOneAndUpdate({
        login,
        password,
    }, {
        $set: {
            token: {
                value: newToken,
            },
        },
    }, {
        "new": true,
    });
});

userSchema.static('checkSession', async function (token) {
    const found = await this.find({
        'token.value': token,
    });
    if(found.length > 1) {
        this.found.forEach(user => {
            user.update({$set: {token: null}});
        });
        return undefined;
    } else {
        const user = _.first(found);
        if(user.token.expire > new Date()) {
            return user;
        }
    }
});

let User = mongoose.model('user', userSchema);

module.exports = User;