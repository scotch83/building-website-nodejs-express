const express = require('express');
const speakers = require('./speakers');
const feedback = require('./feedback');
const router = new express.Router();
router.get('/', async (req, res) => {
    const Speakers = require('../services/SpeakerService')
    const service = new Speakers('./data/speakers.json')
    const topSpeakers = await service.getList()
    const artworks = await service.getAllArtwork()
    res.render('layout', { pageTitle: 'Welcome', template: "home", topSpeakers, artworks });
})
router.use(...speakers)
router.use(...feedback)
module.exports = ['/', router];
