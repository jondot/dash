(function() {
  var Fs, Path, app, express, file, io, parsers, parsers_path, port, _i, _len, _ref;
  express = require('express');
  app = express.createServer();
  io = require('socket.io').listen(app);
  Fs = require('fs');
  Path = require('path');
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
  parsers_path = __dirname + '/parsers';
  parsers = {
    "default": function(req) {
      return JSON.parse(req.param('content'));
    }
  };
  _ref = Fs.readdirSync(parsers_path);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    file = _ref[_i];
    require("" + parsers_path + "/" + (Path.basename(file, Path.extname(file))))(parsers);
  }
  app.post('/messages', function(req, res) {
    var msg, parser_type;
    parser_type = req.param('dash_from') || 'default';
    msg = parsers[parser_type](req);
    console.log(msg);
    if (msg) {
      io.sockets.emit("message", msg);
    }
    return res.send('');
  });
}).call(this);
