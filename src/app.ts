import express from "express";
import LecutreRouter from "./routes/lectures";

const app = express();
const router = express.Router();

app.use("/lectures", LecutreRouter);

app.use("", router);
app.listen(3000, async () => {
  console.log(`Server Listening on http://127.0.0.1:3000`);
});
