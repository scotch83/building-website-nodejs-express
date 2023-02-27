const express = require('express');
const FeedbackService = require('../services/FeedbackService');
const service = new FeedbackService('./data/feedback.json')
const router = express.Router();
router.get('/', async (req, res) => {
    const data = await service.getList();
    res.json(data)
})
router.post('/', (req, res) => {
    res.send('Feedback posted');
})
module.exports = ['/feedbacks', router];
