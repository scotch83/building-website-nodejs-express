const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Feedback page')
})
router.post('/', (req, res) => {
    res.send('Feedback posted');
})
module.exports = ['/speakers', router];
