let jwt = require('jsonwebtoken');
const {SECRET} = require("../constants");

exports.authenticate = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err){
                return res.status(403).send("Token is not valid");
            }
            else {
                req.userId = decoded.id
                next();
            }

        })
    }
    else return res.status(404).send("Token not supplied");
}