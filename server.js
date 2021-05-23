const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const express = require("express");
const app= express();

const http = require("http").createServer();

const io = require("socket.io")(http);

const gameRoom = ["sunflower", "rose", "lily"];

io  
    .of("/games")
    .on("connection", (socket) => {
    socket.emit("welcome", "Hello, we are connected via games");
    
    socket.on("joinRoom", (room) => {
        if(gameRoom.includes(room)){
            socket.join(room);
            io 
                .of("/games")
                .in(room)
                .emit("newUser", "new player joined the room");
            return socket.emit("success", "you have successfully joined the room");
        }
        else {
            return socket.emit("err", "error room not found at room", room);
        }

        socket.disconnect();
    });
});

http.listen(3000, () => {
    console.log("server up and running at port 3000");
});