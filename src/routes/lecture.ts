import express from "express";
import { getFullSoonLecture, searchLecture } from "../utils/lecture";

const router = express.Router();

router.get("", async (req, res) => {
  const search: string = req.query.search as string;
  let lectures = await searchLecture(search);

  res.json([lectures]);
});

router.get("/soon", async (req, res) => {
  const fullSoonLectures = await getFullSoonLecture();

  res.json(fullSoonLectures);
});

export default router;
