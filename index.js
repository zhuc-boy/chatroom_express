var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/h5/index.html");
});
io.on("connection", function(socket) {
  //console.log(socket);
  console.log("a user connected");
  io.on("disconnection", function() {
    console.log("user disconnect");
  });
  socket.on("chat message", function(msg) {
    console.log("msg:" + msg);
  });
});
http.listen(3100, function() {
  console.log("connect to host 3100");
});
