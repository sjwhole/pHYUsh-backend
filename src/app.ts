import express from "express";
import { sequelize } from "./models";
import { getSugangInfo } from "./utils/lecture";

const app = express();
const router = express.Router();

router.get("/lectures", async (req, res) => {
  const search: string = req.query.search as string;
  let lectures = await getSugangInfo(search);
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

app.use("", router);
app.listen(3000, async () => {
  console.log(`Server Listening on localhost:3000`);
});
