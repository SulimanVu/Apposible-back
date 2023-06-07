require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const userRouter = require("./routes/user.route");
const fileRouter = require("./routes/file.route");
const roomRouter = require("./routes/room.route");
const taskRouter = require("./routes/task.route");
// const { serverUrl } = require("./serverUrl");

// WebRTC
const { version, validate } = require("uuid");

app.use(fileUpload({}));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// WebRTC
// const publicPath = path.join(__dirname, "build");
// app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.resolve(__dirname, "public")));

//Routes
app.use("/api/auth", userRouter);
app.use("/api/files", fileRouter);
app.use("/room", roomRouter);
app.use("/task", taskRouter);

// WebRTC
// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("mongoose connect"))
  .catch(() => console.log("mongoose warning"));

//Chat
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: serverUrl,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// WebRTC
// function getClientRooms() {
//   const { rooms } = io.sockets.adapter;

//   return Array.from(rooms.keys()).filter(
//     (roomID) => validate(roomID) && version(roomID) === 4
//   );
// }

// WebRTC
// function shareRoomsInfo() {
//   io.emit("share-rooms", {
//     rooms: getClientRooms(),
//   });
// }

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  // WebRTC

  //   shareRoomsInfo();

  //   socket.on("join", (config) => {
  //     const { room: roomID } = config;
  //     const { rooms: joinedRooms } = socket;

  //     if (Array.from(joinedRooms).includes(roomID)) {
  //       return console.warn(`Already joined to ${roomID}`);
  //     }

  //     const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

  //     clients.forEach((clientID) => {
  //       io.to(clientID).emit("add-peer", {
  //         peerID: socket.id,
  //         createOffer: false,
  //       });

  //       socket.emit("add-peer", {
  //         peerID: clientID,
  //         createOffer: true,
  //       });
  //     });

  //     socket.join(roomID);
  //     shareRoomsInfo();
  //   });

  //   function leaveRoom() {
  //     const { rooms } = socket;

  //     Array.from(rooms)
  //       // LEAVE ONLY CLIENT CREATED ROOM
  //       .filter((roomID) => validate(roomID) && version(roomID) === 4)
  //       .forEach((roomID) => {
  //         const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

  //         clients.forEach((clientID) => {
  //           io.to(clientID).emit("remove-peer", {
  //             peerID: socket.id,
  //           });

  //           socket.emit("remove-peer", {
  //             peerID: clientID,
  //           });
  //         });

  //         socket.leave(roomID);
  //       });

  //     shareRoomsInfo();
  //   }

  //   socket.on("leave", leaveRoom);
  //   socket.on("disconnecting", leaveRoom);

  //   socket.on("relay-sdp", ({ peerID, sessionDescription }) => {
  //     io.to(peerID).emit("session-description", {
  //       peerID: socket.id,
  //       sessionDescription,
  //     });
  //   });

  //   socket.on("relay-ice", ({ peerID, iceCandidate }) => {
  //     io.to(peerID).emit("ice-candidate", {
  //       peerID: socket.id,
  //       iceCandidate,
  //     });
  //   });
});

server.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порте ${process.env.PORT}`);
});
