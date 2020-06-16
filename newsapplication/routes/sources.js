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

router.get('/allsources', async (req, res) => {

    try {
        newsapi.v2.sources({
            category: '',
            language: 'en',
            country: 'us'
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


router.post('/subscribe/:sourceName', async (req, res) => {

    console.log("Subscribing to Source", req.body);

    try {
        const currentUserSubs = await UserModel.find(
            {token: req.header("JWT")},
            {_id: 1, sources: 1}
        );

        const userSubscribeStatus = currentUserSubs[0].sources.includes(req.params.sourceName);

        if (userSubscribeStatus) {
            res.status(201).json(`You are already Subscribed to ${req.params.sourceName}`);
        } else {
            const oldSources = currentUserSubs[0].sources;

            currentUserSubs[0].sources = [...oldSources, req.params.sourceName];
        }

        let results = await UserModel
            .findByIdAndUpdate(currentUserSubs[0]._id, currentUserSubs[0], {new: true})
            .exec();

        res.status(201).json(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

router.post('/unsubscribe/:sourceName', async (req, res) => {

    console.log("Subscribing to Source", req.body);

    try {
        const currentUserSubs = await UserModel.find(
            {token: req.header("JWT")},
            {_id: 1, sources: 1}
        );

        const userSubscribeStatus = currentUserSubs[0].sources.includes(req.params.sourceName);

        if (userSubscribeStatus) {
            const oldSources = currentUserSubs[0].sources;
            const newSources = oldSources.filter(source => source !== req.params.sourceName);
            currentUserSubs[0].sources = newSources;
        } else {
            res.status(201).json(`You are not Subscribed to ${req.params.sourceName}`);
        }

        let results = await UserModel
            .findByIdAndUpdate(currentUserSubs[0]._id, currentUserSubs[0], {new: true})
            .exec();

        res.status(201).json(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

module.exports = router;
