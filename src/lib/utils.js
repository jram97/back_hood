const key = require("../keys");
const jwt = require('jsonwebtoken');


const util = {};

util.auth = (req, res, next) => {


    const getToken = req.headers['access-token'];

    if(!getToken){
       return res.status(401).json({ ok: false, msg: "You must be logged in", data: [] })
    }

    const token = getToken.replace("Bearer ","")

    if (token) {
        jwt.verify(token, key.llave, (err, decoded) => {
            if (err) {
                return res.json({
                    ok: false,
                    msg: "Token is wrong or has expired",
                    data: []
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            ok: false,
            msg: "Token missing",
            data: []
        });
    }
};

util.findDocument = async (Model,id) => {
    try {
        return Model.findOne({_id: id}, {_id: 1})
    } catch (error) {
        throw new Error(`Error db request`)
    }
}

module.exports = util;