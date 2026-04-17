import app from "./app.ts";
import config from "./app/config/index.ts";

const port = config.port;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
