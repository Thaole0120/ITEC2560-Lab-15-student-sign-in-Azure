const express = require('express')
const apiRoutes = require('./routes/api.js')

const path = require ('path')

//Create web application server
const app = express()

const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles) //request to homepage, serve static file -  the Vue app index.html

app.use(express.json())

app.use('/api',apiRoutes)

app.use( function(req, res, next ) {
    res.status(404).send('Sorry, not found.')
    //todo - can't find a matching route
})

app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Server error')
})

//Start server running 
const server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port', server.address().port)
})