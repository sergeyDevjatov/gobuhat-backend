let mongoose = require('mongoose');

module.exports = async (url) => {
    mongoose.connect(url);

    if(process.env.CLEAR_DATABASE !== undefined) {
        await mongoose.connection.dropDatabase();
    }
};