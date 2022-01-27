import express, { Request, Response } from "express";
import { getFullSoonLecture, searchLecture } from "../utils/lecture";

const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  const search: string = req.query.search as string;
  let lectures = await searchLecture(search);

  res.json(lectures);
});

router.get("/soon", async (req: Request, res: Response) => {
  const fullSoonLectures = await getFullSoonLecture();

  res.json(fullSoonLectures);
});

export default router;
