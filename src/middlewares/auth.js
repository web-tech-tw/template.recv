const {validateAuthToken} = require('../utils/token');

module.exports = (ctx) => function (req, _, next) {
    const auth_code = req.header('Authorization');
    if (!auth_code) {
        next();
        return;
    }
    const params = auth_code.split(" ");
    if (params.length !== 2) {
        next();
        return;
    }
    req.auth_method = params[0];
    switch (params[0]) {
        case "SARA": {
            req.authenticated = validateAuthToken(ctx, params[1]);
            break;
        }
    }
    next();
};
