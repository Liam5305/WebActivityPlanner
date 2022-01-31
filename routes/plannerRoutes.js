const express = require('express');
const router = express.Router();
const controller = require('../controllers/plannerController');
const auth = require('../auth/auth');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get("/", controller.landing_page);

router.get("/agenda", ensureLoggedIn('/login'), controller.entries_list);

router.get("/share", controller.confirm_shared_log);

router.get("/edit", controller.edit_entry);

router.get('/new', ensureLoggedIn('/login'), controller.show_new_entries);

router.post('/new', ensureLoggedIn('/login'), controller.post_new_entry);

router.post('/log', controller.post_new_entry);

router.get('/delete', ensureLoggedIn('/login'), controller.delete_entries);

router.get('/register', controller.show_register_page);

router.get('/dashboard', ensureLoggedIn('/login'), controller.show_dashboard_page);

router.get('/overview', ensureLoggedIn('/login'), controller.show_overview);

router.get('/posts:author', controller.show_user_entries);

router.get('/schedule', ensureLoggedIn('/login'), controller.show_schedule);

router.get('/tracking', ensureLoggedIn('/login'), controller.show_tracking);

router.get('/about', controller.show_about_page);

router.get('/login', controller.show_login_page);

router.post('/login', auth.authorize('/login'), controller.post_login);

router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get('/schedule', controller.show_schedule);

router.get('/reschedule', controller.show_reschedule_page);

router.get('/logout', controller.logout);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;