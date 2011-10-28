express = require('express')
app = express.createServer()
io  = require('socket.io').listen(app)


app.configure ()->
  app.use express.static(__dirname + '/public')
  app.use express.bodyParser()

port = process.env.PORT || 3000
app.listen(port)




app.post '/messages',  (req, res) ->
  content = req.param('content')
  io.sockets.emit("message", JSON.parse(content)) if content
  res.send('')
