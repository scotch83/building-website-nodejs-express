const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/home', (req, res) => {
    res.render('pages/index', { pageTitle: "Platone" });
})

app.use(...routes);
app.use(express.static(path.join(__dirname, 'static')))
app.use(cookieSession({
    name: 'session',
    keys:['mlmlsjàç','"34454']
}))
app.set('trust proxy', true);
app.listen(port, () => {
    console.log("Server listening on port " + port);
})
