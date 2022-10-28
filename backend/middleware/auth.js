require("dotenv").config();
const jwt = require("jsonwebtoken")
secretTokenKey = process.env.TOKEN_SECRET

// check UserToken
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, secretTokenKey)
        const userId = decodedToken.userId
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({
            error
        });
    }
}