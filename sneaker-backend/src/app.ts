import cors from "cors";
import express, {type Application, type Request, type Response} from "express";
import {globalErrorHandler} from "./app/middleware/globarErrorHandler";
import {notFound} from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from new file system and tsconfig change !");
});
app.get("/new", (req: Request, res: Response) => {
  res.send("Hello World from new file system and new live !");
});

// ? route use

app.use("/api/v1", router);

// global error handler

app.use(globalErrorHandler);
app.use(notFound);

export default app;
