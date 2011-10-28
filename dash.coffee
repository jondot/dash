express = require('express')
app = express.createServer()
io  = require('socket.io').listen(app)

# on heroku, use $ heroku config:add FORCE_POLLING=10
if process.env.FORCE_POLLING
  io.configure ()->
    io.set("transports", ["xhr-polling"])
    io.set("polling duration", process.env.FORCE_POLLING)


app.configure ()->
  app.use express.static(__dirname + '/public')
  app.use express.bodyParser()


port = process.env.PORT || 3000
app.listen(port)





app.post '/messages',  (req, res) ->
  content = req.param('content')
  io.sockets.emit("message", JSON.parse(content)) if content
  res.send('')
