const { checkSession } = require('../model/users');


module.exports = function privateRoute(route) {
    return async function (req, res, next)  {
        const token = req.get('X-AUTH-TOKEN');
        const login = token && await checkSession(token);
        if(!login) {
            res.status(401).send('Not authorized');
            return;
        }

        route(req, res, next, login);
    }
};