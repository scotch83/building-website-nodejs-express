const express = require('express');
const FeedbackService = require('../services/FeedbackService');
const service = new FeedbackService('./data/feedback.json')
const router = express.Router();
const { check, validationResult } = require('express-validator');
router.get('/', async (req, res, next) => {
    try {

        errors = req.session.feedback?.errors ?? false;
        req.session.feedback = {}
        const feedbacks = await service.getList()
        return res.render('layout', { pageTitle: 'Leave your feedback', template: "feedback", feedbacks, errors });
    } catch (err) {
        return next(err)
    }
})
const basicValidation = (name) => {
    return check(name)
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage((...arguments) => {
            console.warn(...arguments);
            return `Field ${name} is required`
        })
}
router.post('/', [
    basicValidation('name'),
    basicValidation('email'),
    basicValidation('title'),
    basicValidation('message'),
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { name, email, title, message } = req.body;
            await service.addEntry(name, email, title, message)
        }
        else req.session.feedback = { errors: errors.array() }

        return res.redirect('/feedback');
    } catch (err) {
        return next(err)
    }
})

router.post('/api', [
    basicValidation('name'),
    basicValidation('email'),
    basicValidation('title'),
    basicValidation('message'),
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { name, email, title, message } = req.body;
            await service.addEntry(name, email, title, message)
        }
        else return res.json({ errors: errors.array() });
        const feedback = await service.getList();
        return res.json({ feedback, successMessage: "Thank you for your feedback!" });
    } catch (err) {
        return next(err)
    }
})
module.exports = ['/feedback', router];
