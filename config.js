module.exports = {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    port: process.env.PORT || '3000',
    secret: process.env.SECRET_KEY || 'default_secret',
};