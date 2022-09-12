const express = require("express");
require("dotenv").config();

const app = express();

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: "*"
  }  
});

io.on("connection", socket => {
  console.log(`Socket with id ${socket.id} is connected.`);

  socket.on("send-message", message => {
    console.log("Chat sent")
    socket.broadcast.emit("receive-message", message);
  });

  socket.on("end-connection", () => {
    socket.disconnect
  })
});


app.listen(8000, () => console.log("Server listening on port 8000"));