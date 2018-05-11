const _ = require('lodash');

const User = require('../db/user');
const Thread = require('../db/thread');

const errorCodes = require('./error_codes');

const startThread = async (owners) => {
    return await Thread.create({owners});
};

const findThreadWithUsers = async (owners) => {
    console.log(owners, await Thread.findOne({owners}));
    return await Thread.findOne({owners});
};

const sendMessageToUser = async (receiver, sender, content) => {
    const thread = await findThreadWithUsers([sender, receiver])
        || await startThread([sender, receiver]);

    const result = await thread.pushMessage(sender, content);
    console.log('send', result);
};

const sendMessage = async (threadId, author, content) => {
    const thread = await Thread.findOne({_id: threadId});
    if(thread) {
        if(thread.owners.indexOf(author) !== -1) {
            const result = await thread.pushMessage(author, content);
            console.log('send', result);
        } else {
            throw new Error(errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD);
        }
    } else {
        throw new Error(errorCodes.THREAD_DOES_NOT_EXIST)
    }
};

const getMessagesWithUser = async (target, requester) => {
    const thread = await findThreadWithUsers([target, requester]);
    if (thread) {
        return thread.messages;
    } else {
        throw new Error(errorCodes.THREAD_DOES_NOT_EXIST)
    }
};


const getMessages = async (threadId, requester) => {
    const thread = await Thread.findOne({_id: threadId});
    if(thread) {
        if(thread.owners.indexOf(requester) !== -1) {
            return thread.messages;
        } else {
            throw new Error(errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD);
        }
    } else {
        throw new Error(errorCodes.THREAD_DOES_NOT_EXIST)
    }
};

module.exports = { sendMessageToUser, sendMessage, getMessagesWithUser, getMessages };