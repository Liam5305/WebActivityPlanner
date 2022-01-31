const { response } = require('express');
const nedb = require('nedb');
const plannerDAO = require('../models/plannerModel');
const db = new plannerDAO();
const userDAO = require('../models/userModel');
db.init();

exports.landing_page = function(req, res) {
    res.render('home', {
        'title': 'Home'
    });
}

exports.entries_list = function(req, res) {
    db.getExistingEntries().then((list)=>{
        res.render('entries', {
            'title':'Posts',
            'entries': list
        });
        console.log('Promise Resolved');
    }).catch((err)=> {
        console.log('Promise Rejected', err)
    })
};

exports.new_entry = function(req, res) {
    res.render('newEntry', {
        'title': 'Training Logs'
    });
}

exports.update_entry = function(req, res) {
    res.render('update_entries', {
        'title': 'Updated Logs'
    });
}

exports.show_schedule = function(req, res) {
    res.render('schedule', {
        'title': 'Schedule'
    });
}

exports.show_reschedule_page = function(req, res) {
    res.render('reschedule', {
        'title': 'Reschedule'
    });
}

exports.delete_entry = function(req, res) {
    console.log("ID in delete_entry");
    res.send("<h1>Delete Entry Called.</h1>");
}

exports.delete_entries = function(req, res) {
    db.DeleteEntry();
    res.redirect('/agenda');
}

exports.show_user_entries = function(req, res) {
    console.log('Filtering author name', req.params.author);

    let user = req.params.author;
    db.getEntriesByUser(user).then((entries) => {
        res.render('entries', {
            'title' : 'Entries by',
            'entries' : entries
        });
    }).catch((err) => {
        console.log('Error handling author posts', err);
    });
}

exports.post_new_entry = function(req, res) {

    console.log("Post new entry", req.body.Type, req.body.Exercise, req.body.Period);
    db.addEntry(req.body.Type, req.body.Exercise, req.body.Period, req.body.author);
    res.redirect('/agenda');
}

exports.show_about_page = function(req, res) {
    res.render("about", {
        'title': "About TeamFitness"
    })
}

exports.show_dashboard_page = function(req, res) {
    res.render("dashboard", {
        'title': "Dashboard"
    })
}


exports.show_register_page = function(req, res) {
    res.render("user/register");
}

exports.login_page = function(req, res) {
    res.redirect('login.html');
}


exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;


    if (!user || !password) {
        res.status(401).send('no user or no password supplied');
        return;
    }

    userDAO.lookup(user, function(err, u) {
        if (u) {
            res.status(401).send("User exists:");
            return;
        }
        userDAO.create(user, password);
        res.redirect('/agenda');
    });

exports.show_user_entries = function(req, res) {
    //extract the author name from the request and log it
    
    let user = req.params.author;
    db.getEntriesByUser(user)
        .then((entries) => {
            res.render("entries", {
                "title": "",
                'user': req.user,
                "entries": entries
            });
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
    }
}

exports.show_register_page = function(req, res) {
    res.render("register", {
        "title": "Register with TF"
    });
}

exports.show_login_page = function(req, res) {
    res.render('login', {
        'title': 'Login with TF'
    })
}


exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
        'title': 'Post_New',
        'user': req.user.user
    })
}

exports.post_login = function(req, res) {
    res.redirect('/');
}

exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
}

exports.server_error = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}

exports.not_found = function(err, req, res, next) {
    res.status(404);
    res.type('text/plain');
    res.send('We didn\'t find what you were looking for ( ͠° ͟ʖ ͡°).');
}

exports.confirm_shared_log = function(req, res) {
    res.render('share', {
        'title': 'Share Log'
    })
}

exports.edit_entry = function(req, res) {
    res.render('newEntry', {
        'title': 'Edit Entry'
    })
}

exports.show_overview = function(req, res) {
    res.render('overview', {
        'title': 'Overview'
    })
}

exports.show_schedule= function(req, res) {
    res.render('schedule', {
        'title': 'Schedule'
    })
}

exports.show_tracking = function(req, res) {
    res.render('tracking', {
        'title': 'Tracking'
    })
}