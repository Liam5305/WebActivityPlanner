const express = require('express');
const router = require('./routes/plannerRoutes');
const path = require('path');
const mustache = require('mustache-express');
const auth = require('./auth/auth');
const session = require('express-session');
const passport = require('passport');

const app = express();

const public = path.join(__dirname, 'public');
app.use(express.static('public'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

auth.init();

app.use('/', router);

app.use(function(req, res) {
    res.status(404);
    return res.send('Oops! We didn/t find what you are looking for.');
})

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
    console.log('Team Fitness');
});