const _ = require('lodash');

const User = require('../db/user');
const Profile = require('../db/profile');

const errorCodes = require('./error_codes');


const getProfile = async (login) => {
    const user = await User.findOne({login}).populate('profile');
    if(user) {
        return user.profile;
    } else {
        throw new Error(errorCodes.USER_DOES_NOT_EXIST)
    }
};

const updateProfile = async (login, profile) => {
    const user = await User.findOne({login}).populate('profile');
    if(user) {
        if(user.profile) {
            Object.assign(user.profile, profile);
            return await user.profile.save();
        } else {
            const profileInstance = await Profile.create(profile);
            user.profile = profileInstance._id;
            return await user.save();
        }
    } else {
        throw new Error(errorCodes.USER_DOES_NOT_EXIST);
    }
};

module.exports = { getProfile, updateProfile };