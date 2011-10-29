express = require 'express'
app = express.createServer()
io  = require('socket.io').listen(app)
Fs  = require 'fs'
Path = require 'path'



#
# on heroku, use $ heroku config:add FORCE_POLLING=10
#
if process.env.FORCE_POLLING
  io.configure ()->
    io.set("transports", ["xhr-polling"])
    io.set("polling duration", process.env.FORCE_POLLING)



app.configure ()->
  app.use express.static(__dirname + '/public')
  app.use express.bodyParser()

port = process.env.PORT || 3000
app.listen(port)



#
# Parsers
# -------
# A parser takes a request and returns a digested message body in the form of
#    {
#      'body' : 'hello world!',
#      'whom':  'john doe',
#      'thumb': '48px-thumb-url',
#      'time':  'long time ago'
#    }
# Except `body`, all parameters have defaults.
# The default parser will take a parameter named `content` and output it verbatim.
#
parsers_path = __dirname+'/parsers'
parsers = 
  default:
    (req)-> JSON.parse(req.param('content'))

for file in Fs.readdirSync(parsers_path)
  require("#{parsers_path}/#{Path.basename(file, Path.extname(file))}") parsers





#
# Messages
# --------
# POST to this endpoint to broadcast a message.
# You can use `dash_from` to specify a parser, i.e. 
#
#   POST http://dash-url.com/messages?dash_from=github
#
# The default parser kicks in when nothing is specified, i.e.
#
#  POST http://dash-url.com/messages
#
app.post '/messages',  (req, res) ->
  parser_type = req.param('dash_from') || 'default'
  msg = parsers[parser_type](req)
  console.log msg
  io.sockets.emit("message", msg) if msg
  res.send('')



