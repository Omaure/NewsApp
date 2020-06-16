const express = require("express")
const mongoose = require('mongoose');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const NewsAPI = require('newsapi');

let router = express.Router();

let UserModel = require("../models/user");

const checkJWT = require("../middlewares/jwt_auth");

router.use(checkJWT);

const newsapi = new NewsAPI('bcd41b1e72d14e3abec9ec61fcb67db9');

router.get('/getnews/:pageNo', async (req, res) => {

    console.log(req.params.pageNo);

    try {
        const userSources = await UserModel.find(
            {token: req.header("JWT")},
            {_id: 0, sources: 1}
        );

        if(userSources[0].sources.length === 0){
            res.json("You do not have any Sources");
        }

        let src = "";

        const currentSources = userSources[0].sources.reduce((prv, curr, index) => {
            src = src + curr + ",";
            console.log(src);
            return src;
        }, "");

        newsapi.v2.everything({
            sources: currentSources,
            page: req.params.pageNo
        }).then(response => {
            res.json(response);
        });
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }

});

module.exports = router;
