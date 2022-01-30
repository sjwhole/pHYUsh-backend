import express, { Request, Response } from "express";
import { createPush, getPushInfos } from "../utils/push";

const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token === undefined) {
    res.status(400);
    res.json({
      message: "URL param 'token' is required.",
    });
    return;
  }
  const query = await getPushInfos(token);

  res.json(query?.pushes.map((e) => e.Lecture));
});

router.post("", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const suupNo = parseInt(req.body.suupNo);

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
