const mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
    name: String,
    lastName: String,
    avatar: String,
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
    },
});

let Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;