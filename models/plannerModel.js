const nedb = require('nedb');
const { delete_entry } = require('../controllers/plannerController');

class activities {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true});
            console.log('DB Connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
            console.log('DB Connected in-memory');
        }
    }

    init() {
        this.db.insert({
            type: 'Exercise',
            exercise: 'Daily walk',
            period: '30 minutes',
            date: '31/02/2021',
            author: 'Peter'
        });
        console.log('First Training Log Added');

        this.db.insert({
            type: 'Exercise',
            exercise: 'Push ups',
            period: '10 minutes',
            date: '10/03/2021',
            author: 'Ann'
        });
        console.log('Second Training Log Added');

        this.db.insert({
            type: 'Brain Exercise',
            exercise: 'Reading a book',
            period: '1 hour',
            date: '14/03/2021',
            author: 'John'
        });
        console.log('Third training log added');

        this.db.remove({
            type: 'Brain Exercise',
            exercise: 'Reading a book',
            period: '1 hour',
            date: '14/03/2021',
            author: 'John'
        })
        console.log('Third log removed');

        this.db.update({exercise: 'Push ups'}, {type: 'Exercise', exercise: 'Sit ups', period: '5 minutes', date: '10/03/2021', author: 'James'}, {});
        console.log('Push ups changed to Sit ups');
    }

    DeleteEntry() {
        let exc = {
            type: 'Exercise'
        }
        this.db.remove(exc, function(err, Num) {
            if(err) {
                console.log('Error deleting exercise', exercise);
            } else {
                console.log(Num, 'document removed from database');
            }
        })
    }

    getExistingEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getExistingEntries() returns:', entries);
                }
            })
        })
    }

    addEntry(typ, exrs, perd, auth) {
        var entry = {
            type: typ,
            exercise: exrs,
            period: perd,
            date: new Date().toISOString().split('T')[0],
            author: auth
        }
        console.log('Entry created', entry);
    
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document'. exercise);
            } else {
                console.log('Document inserted correctly', doc);
            }
        })
    }

    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'author': authorName }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }

}

module.exports = activities;