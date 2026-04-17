import {createServer} from "http";
import app from "./app";
import config from "./app/config";
import {initializeSocket} from "./socket";

const port = config.port;

const server = createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`Sneaker app listening on port http://localhost:${port}`);
  console.log(`Socket.IO server initialized`);
});
