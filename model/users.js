const _ = require('lodash');

const User = require('../db/user');
const Profile = require('../db/profile');

const crypto = require('crypto');
const salt = process.env.SECRET_SALT || 'secret';

const errorCodes = require('./error_codes');


const encodePassword = (password) => {
    const step1 = crypto.createHash('sha1').update(password).digest('hex'),
        step2 = crypto.createHash('sha1').update(step1).update(salt).digest('hex'),
        step3 = crypto.createHash('sha1').update(salt).update(step2).digest('hex'),
        encodedPassword = step3;
    return encodedPassword;
};


const auth = async (login, password) => {
    const foundUser = await User.auth(login, encodePassword(password));
    if(foundUser) {
        return _.pick(foundUser, ['login']);
    } else {
        throw new Error(errorCodes.NOT_AUTHORIZED)
    }
};

const create = async (login, password) => {
    const found = await User.findOne({login});
    if(_.isEmpty(found)) {
        const emptyProfile = await Profile.create({});
        return await User.create({
            login,
            password: encodePassword(password),
            profile: emptyProfile._id,
        });
    } else {
        throw new Error(errorCodes.USER_ALREADY_EXISTS);
    }
};

module.exports = { auth, create };