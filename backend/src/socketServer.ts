import http from "http";
import { Server as socketServer } from "socket.io";

export const initSocketServer = (server: http.Server) => {
  const io = new socketServer(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    // listern for notification event from frontend
    socket.on("notification", (data) => {
      console.log("notification event", data);
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
