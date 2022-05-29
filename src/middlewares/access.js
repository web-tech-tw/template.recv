const { StatusCodes } = require('http-status-codes');

module.exports = (role) => (req, res, next) => {
    const user_roles = req?.authenticated?.user?.roles;
    if (!(user_roles && Array.isArray(user_roles))) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }
    if (role && !user_roles.includes(role)) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
