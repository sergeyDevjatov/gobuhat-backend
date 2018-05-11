const express = require('express');
const router = express.Router();

const privateRoute = require('./privateRoute');
const { sendMessageToUser, sendMessage, getMessagesWithUser, getMessages } = require('../model/messaging');
const errorCodes = require('../model/error_codes');

router.post('/user/:id/send', privateRoute(async (req, res, next, login) => {
    const {content} = req.body,
        {id: userId} = req.params,
        author = login;

    try {
        await sendMessageToUser(userId, author, content);
        res.status(201).send();
    } catch (err) {
        switch(err.message) {
            case errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD:
                res.status(401).send('User can not send messages in this thread');
                break;
            case errorCodes.THREAD_DOES_NOT_EXIST:
                res.status(404).send('This thread does not exist');
                break;
            default:
                throw err;
        }
    }
}));

router.post('/thread/:id/send/', privateRoute(async (req, res, next, login) => {
    const {content} = req.body,
        {id: threadId} = req.params,
        author = login;
    try {
        await sendMessage(threadId, author, content);
        res.status(201).send();
    } catch (err) {
        switch(err.message) {
            case errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD:
                res.status(401).send('User can not send messages in this thread');
                break;
            case errorCodes.THREAD_DOES_NOT_EXIST:
                res.status(404).send('This thread does not exist');
                break;
            default:
                throw err;
        }
    }
}));

router.get('/user/:id/', privateRoute(async (req, res, next, login) => {
    const {id: userId} = req.params;
    try {
        const messages = await getMessagesWithUser(userId, login);
        res.status(200).send(messages);
    } catch (err) {
        switch(err.message) {
            case errorCodes.THREAD_DOES_NOT_EXIST:
                res.status(404).send('Thread with this user does not exist');
                break;
            default:
                throw err;
        }
    }
}));

router.get('/thread/:id/', privateRoute(async (req, res, next, login) => {
    const {id: threadId} = req.params;
    try {
        const messages = await getMessages(threadId, login);
        res.status(200).send(messages);
    } catch (err) {
        switch(err.message) {
            case errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD:
                res.status(401).send('User can not get messages of this thread');
                break;
            case errorCodes.THREAD_DOES_NOT_EXIST:
                res.status(404).send('This thread does not exist');
                break;
            default:
                throw err;
        }
    }
}));

module.exports = router;
