import app from "./app";
import config from "./app/config";

const port = config.port;

app.listen(port, () => {
  console.log(`Sneaker app listening on port http://localhost:${port}`);
});
