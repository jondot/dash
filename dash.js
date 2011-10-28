(function() {
  var app, express, io, port;
  express = require('express');
  app = express.createServer();
  io = require('socket.io').listen(app);
  if (process.env.FORCE_POLLING) {
    io.configure(function() {
      io.set("transports", ["xhr-polling"]);
      return io.set("polling duration", process.env.FORCE_POLLING);
    });
  }
  app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    return app.use(express.bodyParser());
  });
  port = process.env.PORT || 3000;
  app.listen(port);
  app.post('/messages', function(req, res) {
    var content;
    content = req.param('content');
    if (content) {
      io.sockets.emit("message", JSON.parse(content));
    }
    return res.send('');
  });
}).call(this);
