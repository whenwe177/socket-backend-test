const express = require("express");
require("dotenv").config()
const cors = require("cors");
const app = express();
app.use(cors());


const server = app.listen(5000, () => console.log("Server listening on port 5000"));
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", socket => {
  console.log(`Socket with id ${socket.id} is connected.`);

  socket.on("send-message", message => {
    console.log("Chat sent")
    socket.broadcast.emit("receive-message", message);
  });

});

