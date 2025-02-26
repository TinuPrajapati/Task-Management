const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND],
    }
});

// Store list of online users
const userSocketMap = {}; // {userId: socketId}

// Function to get userId by socketId
const getUserIdBySocketId = (socketId) => {
    return Object.keys(userSocketMap).find(userId => userSocketMap[userId] === socketId);
};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("onlineUsers", ({ id: userId }) => {
        if (userId) {
            userSocketMap[userId] = socket.id;
        }
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        
        // Find userId associated with this socketId
        const userId = getUserIdBySocketId(socket.id);
        
        if (userId) {
            delete userSocketMap[userId]; // Remove user from map
        }

        io.emit("onlineUsers", Object.keys(userSocketMap)); // Broadcast updated list
    });
});

module.exports = { app, server };
