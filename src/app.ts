import express from "express";

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use("", router);
app.listen(3000);
