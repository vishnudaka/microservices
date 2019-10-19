const bcrypt = require('bcrypt');
const User = require('../models/user');
const UsageDetail = require("../models/usageDetail.model");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");
const { cpuUsage, cachedMemory, getGeneralInfo, check_net } = require("../services/user.services");

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("User with email does not exist. Please try again");

    bcrypt.compare(req.body.password, user.password, async (err, result) => {
        console.log(req.body.password, user.password, result);
        if (err) res.status(401).send("Error");
        else if (result == true) {
            const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "24h" });

            res.status(200).send({ token, user });
        }
        else {
            res.status(401).send("Password does not match");
        }
    })
}


exports.getCpuUsage = async (req, res) => {

    let result = await getGeneralInfo();
    let result1 = await cpuUsage();
    let result2 = await cachedMemory();
    let result3 = await check_net();
    console.log("Data......controller", result, result1, result2, result3);
    const usageDetail = new UsageDetail({
        userId: req.userId,
        time_unix: new Date().getTime() / 1000,
        cache: result2.cache,
        cpuUsage: result1,
        usedMemory: result2.used,
        systemDetails: result,
        check_net: result3
    });
    const resultSave = usageDetail.save();
    if (resultSave) res.send({ "Saved Details ": usageDetail });
}
