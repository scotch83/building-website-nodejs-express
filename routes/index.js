const express = require('express');
const speakers = require('./speakers');
const feedback = require('./feedback');
const router = new express.Router();
router.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: "Platone" });
})
router.use(...speakers)
router.use(...feedback)
module.exports = ['/', router];
