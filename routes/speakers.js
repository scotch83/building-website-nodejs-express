const express = require('express');
const Speakers = require('../services/SpeakerService')
const router = new express.Router();
const service = new Speakers('./data/speakers.json')

router.get('/', async (req, res) => {
    const data = await service.getList();
    res.json(data)
})
router.get('/:shortname', async (req, res) => {
    const data = await service.getSpeaker(req.params.shortname);
    res.json(data)
})
module.exports = ['/speakers', router]
