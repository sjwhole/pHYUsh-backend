import express from "express";
import {
  getFullSoonLecture,
  getLectureInfo,
} from "../utils/lecture";

const router = express.Router();

router.get("", async (req, res) => {
  const search: string = req.query.search as string;
  let lectures = await getLectureInfo(search);
  lectures = lectures.map(
    (e: {
      haksuNo: string;
      suupNo: string;
      gwamokNm: string;
      hakjeom: number;
      daepyoGangsaNm: string;
      suupTimes: string;
      jehanInwon: string;
    }) => {
      return {
        haksuNo: e.haksuNo,
        suupNo: e.suupNo,
        gwamokNm: e.gwamokNm,
        daepyoGangsaNm: e.daepyoGangsaNm,
        hakjeom: e.hakjeom,
        suupTimes: e.suupTimes,
        jehanInwon: e.jehanInwon,
      };
    }
  );
  res.json([lectures]);
});

router.get("/soon", async (req, res) => {
  const fullSoonLectures = await getFullSoonLecture();
  res.json(fullSoonLectures);
});

export default router;
