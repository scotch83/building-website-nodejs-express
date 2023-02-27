const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.send('Speakers page')
})
router.get('/:shortname', (req, res) => {
    res.send(`Page for ${req.params.shortname}`)
})
module.exports = ['/speakers', router]
