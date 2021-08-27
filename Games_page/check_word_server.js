var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const cors = require("cors")
app.use(express.static(__dirname))
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
    })
)
var checkWord = require('check-word'),
    words     = checkWord('en');

app.get('/check_word', (req, res) =>{
    io.emit("exist_word",words.check(req.body))
    res.sendStatus(200)

})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})