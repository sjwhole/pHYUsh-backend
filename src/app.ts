import express from "express";
import LecutreRouter from "./routes/lecture";
import PushRouter from "./routes/push";

const app = express();

app.use("/lectures", LecutreRouter);
app.use("/push", PushRouter);

app.listen(3000, async () => {
  console.log(`Server Listening on http://127.0.0.1:3000`);
});
