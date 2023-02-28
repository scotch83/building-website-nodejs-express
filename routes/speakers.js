const express = require('express');
const Speakers = require('../services/SpeakerService')
const router = new express.Router();
const service = new Speakers('./data/speakers.json')

router.get('/', async (req, res) => {
    const Speakers = require('../services/SpeakerService')
    const service = new Speakers('./data/speakers.json')
    const speakers = await service.getList()
    return res.render('layout', { pageTitle: 'Welcome', template: "speakers", speakers });
})
router.get('/:shortname', async (req, res) => {
    const speaker = await service.getSpeaker(req.params.shortname);
    const artworks = await service.getArtworkForSpeaker(req.params.shortname);
    console.log(speaker)
    return res.render('layout', { pageTitle: speaker.name, template: "speaker", speaker, artworks });
})
module.exports = ['/speakers', router]
