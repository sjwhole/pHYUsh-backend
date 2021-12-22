import express from "express";
import { getPushInfos } from "../utils/push";

const router = express.Router();

router.get("", async (req, res) => {
  const token = req.query.token as string;
  if (token === undefined) {
    res.status(400);
    res.json({
      message: "URL param 'token' is required.",
    });
    return;
  }
  const query = await getPushInfos(token);

  res.json(query?.pushes);
});

export default router;
