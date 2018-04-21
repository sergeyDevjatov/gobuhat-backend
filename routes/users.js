const express = require('express');
const router = express.Router();
const {auth, create} = require('../model/users');
const {updateProfile, getProfile} = require('../model/profiles');
const errorCodes = require('../model/error_codes');


router.post('/authenticate', async function(req, res, next) {
    const {login, password} = req.body;
    try {
        const user = await auth(login, password);
        res.status(200).send(user);
    } catch (err) {
        switch(err.message) {
            case errorCodes.NOT_AUTHORIZED:
                res.status(401).send('Authentication failed');
                break;
            default:
                throw err;
        }
    }
});

router.post('/register', async function(req, res, next) {
    const {login, password} = req.body;
    try {
        await create(login, password);
        res.status(201).send();
    } catch (err) {
        switch(err.message) {
            case errorCodes.USER_ALREADY_EXISTS:
                res.status(409).send('User with such login is existing now');
                break;
            default:
                throw err;
        }
    }
});

router.patch('/:login/profile', async function(req, res, next) {
    const profile = req.body,
        login = req.params.login;
    try {
        const result = await updateProfile(login, profile);
        res.status(200).send(result);
    } catch (err) {
        switch(err.message) {
            case errorCodes.USER_DOES_NOT_EXIST:
                res.status(404).send();
                break;
            default:
                throw err;
        }
    }
});

router.get('/:login/profile', async function(req, res, next) {
    const {login} = req.params;
    try {
        const profile = await getProfile(login);
        res.status(profile && 200 || 204).send(profile);
    } catch (err) {
        switch(err.message) {
            case errorCodes.USER_DOES_NOT_EXIST:
                res.status(404).send();
                break;
            default:
                throw err;
        }
    }
});

module.exports = router;
