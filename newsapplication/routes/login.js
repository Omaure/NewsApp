const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');


const router = express.Router();

router.post('/', async (req, res) => {
    const usermail = req.body.email;
    const password = req.body.password;
    console.log("======", usermail, "============", password);
    console.log("------------", JSON.stringify(req.body));

    try {
        const user = await userModel.find({email: usermail});

        if (user.length === 0) {
            res.send(401, "Invalid Information");
        } else {
            // test a matching password
            user[0].comparePassword(password, async (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    if (!user[0].token) {
                        const signToken = await jwt.sign({usermail: usermail}, "secretkey");
                        user[0].token = signToken;
                        //save new Token
                        const result = await userModel.findByIdAndUpdate(user[0]._id, user[0]);
                        res.send({token: signToken, isAdmin: result.isAdmin});
                    }
                    res.send({token: user[0].token, isAdmin: user[0].isAdmin});

                } else {
                    res.send(401, "Invalid Information");
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
