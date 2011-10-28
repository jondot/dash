express = require('express')
sio = require('socket.io')

# on heroku, use $ heroku config:add FORCE_POLLING=10
if process.env.FORCE_POLLING
  sio.configure ()->
    sio.set("transports", ["xhr-polling"])
    sio.set("polling duration", process.env.FORCE_POLLING)


app = express.createServer()
app.configure ()->
  app.use express.static(__dirname + '/public')
  app.use express.bodyParser()


port = process.env.PORT || 3000



app.listen(port)
io  = sio.listen(app)




app.post '/messages',  (req, res) ->
  content = req.param('content')
  io.sockets.emit("message", JSON.parse(content)) if content
  res.send('')
