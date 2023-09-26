// require Express.js
const express = require('express')

const app = express()
// require morgan and fs
const morgan = require('morgan')
const fs = require('fs')
// require database script file

// const logdb = require('./src/services/database.js')
const db = require('./src/services/database.js')

const cors = require('cors')
const { restart } = require('nodemon')
app.use(cors())

// server static HTML files
app.use(express.static('./public'))

const args = require('minimist')(process.argv.slice(2))
const port = args.port || process.env.PORT || 5555

const server = app.listen(port, () => {
  console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

// Allow JSON body messages on all endpoints
app.use(express.json())
// Allow URL encoded body messages on all endpoints
app.use(express.urlencoded({extended: true }))

//Define base endpoint
app.get('/app/', (req, res) => {
  res.statusCode = 200 
  res.statusMessage = 'OK Working'
  res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
  res.end(res.statusCode + ' ' + res.statusMessage)
})

// backend for asking questions

//logs data inputted in the user
app.post('/app/log/', (req, res, next) => {
  let data = {
    uname: req.body.uname,
    name: req.body.name,
    sleep: req.body.sleep,
    sleepQuality: req.body.sleepQuality,
    appetite: req.body.appetite,
    mood: req.body.mood,
    reflect: req.body.reflect
}
  const stmt = db.prepare("UPDATE mentalTracker SET name = COALESCE(?, name), sleep = COALESCE(?, sleep), sleepQuality = COALESCE(?, sleepQuality), appetite = COALESCE(?, appetite), mood = COALESCE(?, mood), reflect = COALESCE(?, reflect) WHERE uname = ?")
  const info = stmt.run(data.name, data.sleep, data.sleepQuality, data.appetite, data.mood, data.reflect, req.body.uname)
  return res.status(200).json({'uname': data.uname, 'name': data.name, 'sleep': data.sleep, 'sleepQuality': data.sleepQuality, 'appetite': data.appetite, 'mood': data.mood, 'reflect': data.reflect})
})

//return mental health record for specific user
app.get('/app/analysis/:uname', (req, res, next) => {
  if(req.params.uname === undefined){
    return res.status(200).send({message:"Invalid Username"})
  }

  const stmt = db.prepare("SELECT * FROM mentalTracker WHERE uname='" + req.params.uname + "'").get()
  res.status(200).json(stmt)
})

//sign up or create account
app.post('/app/createAccount/', (req, res, next) =>{
   const stmt = db.prepare("SELECT COUNT(*) FROM mentalTracker WHERE uname='" + req.body.uname + "'")
   const search = stmt.get()
   console.log(search)
   if(search["COUNT(*)"] !== 0){
     return res.status(200).send({message: "This username already exists, please try another one!"})
   }
   else{
       createAccount = db.prepare("INSERT INTO mentalTracker (uname, name, sleep, sleepQuality, appetite, mood, reflect) VALUES (?, ?, ?, ?, ?, ?, ?)")
       createAccount.run(
         String(req.body.uname),
         String(""),
         String(0),
         String(""),
         String(""),
         String(""),
         String("")
       )
       return res.status(200).send({message: "Your account has been created! Login in to your account!"})
   }
})

//login 
app.post('/app/authentication/', (req, res) =>{
  const stmt = db.prepare("SELECT * FROM mentalTracker WHERE uname='" + req.body.uname + "'")
  const search = stmt.get()
  if(search === undefined){
    return res.status(200).send({message:"Invalid password"})
  }

  const uname = search.uname
  return res.status(200).send({uname: uname, message: "Logged in!"})

})

//delete account
app.post("/app/remove/", (req, res) => {
  const stmt = db.prepare("SELECT COUNT(*) FROM mentalTracker WHERE uname='" + req.body.uname + "'")
  const search = stmt.get()
   if(search["COUNT(*)"] === 0){
     return res.status(200).send({message: "This username does not exist! You cannot delete an account that has not been created!"})
   }
   else{
    const stmt = db.prepare('DELETE FROM mentalTracker WHERE uname = ?')
    const info = stmt.run(req.body.uname)
    return res.status(200).send({message: "Your account has been deleted!"}) 
  }
})

//default response for any other request
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
})