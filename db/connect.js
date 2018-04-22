let mongoose = require('mongoose');

module.exports = async (url) => {
    mongoose.connect(url);
};