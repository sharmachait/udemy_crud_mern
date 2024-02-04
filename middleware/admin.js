const { Admin } = require("../db/index");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    let user = await Admin.findOne({ username: username, password: password });
    if (user) {
        next();
    }
    else {
        res.status(403).json({ msg: "admin doesnt exist" });
    }
}

module.exports = adminMiddleware;