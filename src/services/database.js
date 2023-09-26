const database = require('better-sqlite3')

const db = new database('tracker.db')

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='mentalTracker';`)

let row = stmt.get();

if(row === undefined) {

    console.log('Your mental health tracker database seems to be empty. I will initialize it now.')

    const sqlInit = 
    `CREATE TABLE mentalTracker ( 
        id INTEGER PRIMARY KEY, 
        uname TEXT, 
        name TEXT,
        sleep INTEGER,
        sleepQuality TEXT,  
        appetite TEXT,
        mood TEXT, 
        reflect TEXT);`;

    db.exec(sqlInit)

    console.log('Your database has been initialized with a new table.');

} else {

    console.log('The mental health tracker database exists.')
    
}

module.exports = db