const mongoose = require('mongoose');

let threadSchema = mongoose.Schema({
    owners: [String],
    messages: [{
        author: String,
        content: String,
        updated: {
            type: Date,
            default: Date.now,
        },
    }],
});

threadSchema.method('pushMessage', async function (author, content) {
    return await this.update(
        { $push: { messages: {author, content } } }
    );
});

let Thread = mongoose.model('thread', threadSchema);

module.exports = Thread;