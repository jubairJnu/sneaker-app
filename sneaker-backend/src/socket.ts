import {Server as HTTPServer} from "http";
import {Socket, Server as SocketIOServer} from "socket.io";
import config from "./app/config";

let io: SocketIOServer | null = null;

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const initializeSocket = (server: HTTPServer): void => {
  io = new SocketIOServer(server, {
    cors: {
      origin: config.frontend_url,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("connection", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const emitProductStockUpdate = (data: any): void => {
  io?.emit("stock-update", {
    data,
  });
};

export const emitSuccesPurchase = (data: any): void => {
  io?.emit("purchase-success", {
    data,
  });
};
