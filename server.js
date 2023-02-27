const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/home', (req, res) => {
    res.render('pages/index', { pageTitle: "Platone" });
})

app.use(express.static(path.join(__dirname, 'static')))

app.listen(port, () => {
    console.log("Server listening on port " + port);
})
