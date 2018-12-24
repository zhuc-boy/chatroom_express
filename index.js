var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/h5/index.html");
});
io.of(""); //namespace，defined '/'
io.on("connection", function(socket) {
  //console.log(socket);
  console.log("a user connected");
  socket.emit("news", { hello: "world" });
  io.on("disconnection", function() {
    console.log("user disconnect");
  });
  socket.on("chat message", function(msg) {
    console.log("msg:" + msg);
    socket.broadcast.emit("server inf", msg);
  });
  socket.on("say to someone", function(id, msg) {
    socket.broadcast.to(id).emit("my message", msg);
  });
});
http.listen(3100, function() {
  console.log("connect to host 3100");
});
/*
var io = require('socket.io')(80);
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
*/
