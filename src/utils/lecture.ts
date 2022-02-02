import axios from "axios";
import { ILecture } from "../../types/types";
import client from "../client";

export const getLectureInfo = async (lectureName: string = "") => {
  let response = await axios.post(
    "https://portal.hanyang.ac.kr/sugang/SgscAct/findSuupSearchSugangSiganpyo.do?pgmId=P310278&menuId=M006631&tk=e9068598524e004a4af6d96d34410fa56705e76bb2f7fc2df35729471b0f3b45",
    {
      skipRows: "0",
      maxRows: "10000",
      strLocaleGb: "ko",
      strIsSugangSys: "true",
      strDetailGb: "0",
      notAppendQrys: "true",
      strSuupOprGb: "0",
      strJojik: "H0002256",
      strSuupYear: "2022",
      strSuupTerm: "10",
      strIsuGrade: "",
      strTsGangjwa: "",
      strTsGangjwaAll: "0",
      strIlbanCommonGb: "",
      strIsuGbCd: "",
      strHaksuNo: "",
      strChgGwamok: "",
      strGwamok: lectureName,
      strDaehak: "",
      strHakgwa: "",
      strYeongyeok: "",
    },
    {
      headers: {
        "content-type": "application/json+sua; charset=UTF-8",
      },
    }
  );

  let data = response.data;
  let lectures = data.DS_SUUPGS03TTM01[0].list;
  return lectures;
};

export const updateLectureInfo = async () => {
  const lectures: ILecture[] = await getLectureInfo();
  let suupSets = new Set();

  const filteredLectures = lectures.filter((e: ILecture) => {
    const suupNo = parseInt(e.suupNo);

    if (suupSets.has(suupNo)) return false;

    suupSets.add(suupNo);

    return true;
  });

  filteredLectures.forEach(async (lecture: ILecture) => {
    const {
      haksuNo,
      suupNo: strSuupNo,
      gwamokNm,
      hakjeom,
      daepyoGangsaNm,
      suupTimes,
      jehanInwon,
      isuGbCd: strGbCd,
      isuGbNm,
    } = lecture;

    const suupNo = parseInt(strSuupNo);
    const inwonInfo = jehanInwon.split("/");
    const isuGbCd = parseInt(strGbCd);
    const currentInwon = parseInt(inwonInfo[0]);
    const limitInwon = parseInt(inwonInfo[1]);

    await client.lecture.upsert({
      create: {
        suupNo,
        haksuNo,
        gwamokNm,
        hakjeom,
        daepyoGangsaNm,
        suupTimes,
        currentInwon,
        limitInwon,
        isuGbCd,
        isuGbNm,
      },
      update: {
        haksuNo,
        gwamokNm,
        hakjeom,
        daepyoGangsaNm,
        suupTimes,
        currentInwon,
        limitInwon,
        isuGbCd,
        isuGbNm,
      },
      where: {
        suupNo,
      },
    });
  });
};

export const getFullSoonLecture = async () => {
  return client.$queryRaw`SELECT *
  FROM "Lecture"
  WHERE "isuGbCd" = 711 AND "limitInwon" - "currentInwon" BETWEEN 1 AND "limitInwon" / 10
  ORDER BY "limitInwon" - "currentInwon"`;
};

export const searchLecture = async (name: string) => {
  return client.lecture.findMany({
    where: {
      gwamokNm: {
        contains: name,
      },
    },
  });
};
