(function() {
  var app, express, io, port, sio;
  express = require('express');
  sio = require('socket.io');
  if (process.env.FORCE_POLLING) {
    sio.configure(function() {
      sio.set("transports", ["xhr-polling"]);
      return sio.set("polling duration", process.env.FORCE_POLLING);
    });
  }
  app = express.createServer();
  app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    return app.use(express.bodyParser());
  });
  port = process.env.PORT || 3000;
  app.listen(port);
  io = sio.listen(app);
  app.post('/messages', function(req, res) {
    var content;
    content = req.param('content');
    if (content) {
      io.sockets.emit("message", JSON.parse(content));
    }
    return res.send('');
  });
}).call(this);
