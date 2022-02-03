import express from "express";
import LectureRouter from "./routes/lecture";
import PushRouter from "./routes/push";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("common"));

app.use("/lectures", LectureRouter);
app.use("/push", PushRouter);

app.listen(3000, async () => {
  console.log(`Server Listening on http://127.0.0.1:3000`);
});
