import express from "express";
import { createPush, getPushInfos } from "../utils/push";

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

router.post("", async (req, res) => {
  const { token, suupNo } = req.body;

  if (token === undefined || suupNo === undefined) {
    res.status(400);
    res.json({
      message: "JSON field 'token' and 'suupNo' are required.",
    });
    return;
  }

  try {
    res.json(await createPush(token, suupNo));
  } catch (e) {
    res.status(409);
    res.json(e);
  }
});

export default router;
