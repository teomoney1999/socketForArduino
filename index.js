// LIBRARY
var http = require("http");
var socketio = require("socket.io");
var ip = require("ip");
// CONFIG
var config = require("./config");

// GLOBAL VARIABLE
var app = http.createServer();
var io = socketio(app);
var PORT = config.PORT;

// Listen at PORT
app.listen(PORT);
console.log(`Server running at: + ${ip.address()}:${PORT}`);

// Create event "connection" to create socket
io.on("connection", (socket) => {
  console.log("Connected");

  // Send welcome command if connected
  socket.emit("welcome", {
    message: "Connected!!!",
  });

  // Listen on "connection" event
  socket.on("connection", (message) => {
    console.log(message);
  });

  socket.on("atime", (data) => {
    let json = {
      name: "teomoney",
      age: 22,
      time: new Date(),
    };

    io.socket.emit("atime", JSON.parse(json));
  });

  socket.on("arduino", (data) => {
    io.socket.emit("arduino", JSON.parse({ message: "R0" }));
    console.log(data);
  });
});
