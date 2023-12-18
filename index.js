const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST'],
    }
});

app.use("/" , (req, res) =>{
    res.send("server started");
})

io.on("connection",(socket) =>{
    console.log(`user connected to ${socket.id}`);
    
    socket.on("send_message", (message) =>{
        console.log(message);
        socket.broadcast.emit("received_message", message);
    })
})


server.listen(3001, () => {
    console.log('listening on http://localhost:3001');
});