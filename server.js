const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const createHttpError = require('http-errors');
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieSession({
    name: 'session',
    keys: ['mlmlsjàç', '"34454']
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.locals.appName = 'ROUX Meetups'
app.use(async (req, res, next) => {
    try {
        const SpeakersService = require('./services/SpeakerService');
        const service = new SpeakersService('./data/speakers.json');
        res.locals.speakerNames = await service.getNames();
        next()
    } catch (error) {
        return next(err)
    }
})
app.use(...routes);
app.use(express.static(path.join(__dirname, 'static')))

app.use((req, res, next) => {
    return next(createHttpError(404, 'We could not really find what you are looking for!'))
});


app.set('trust proxy', true);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.error(err.message)
    res.status(status)
    res.render('error', { error: err })
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
})
