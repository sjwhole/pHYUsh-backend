import axios from "axios";
import e from "express";
import client from "../client";

export const getLectureInfo = async (lectureName: string) => {
  let response = await axios.post(
    "https://portal.hanyang.ac.kr/sugang/SgscAct/findSuupSearchSugangSiganpyo.do?pgmId=P310278&menuId=M006631&tk=e9068598524e004a4af6d96d34410fa56705e76bb2f7fc2df35729471b0f3b45",
    {
      skipRows: "0",
      maxRows: "5000",
      strLocaleGb: "ko",
      strIsSugangSys: "true",
      strDetailGb: "0",
      notAppendQrys: "true",
      strSuupOprGb: "0",
      strJojik: "H0002256",
      strSuupYear: "2021",
      strSuupTerm: "25",
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
  const lectures = await getLectureInfo("");
  lectures.map(
    async (e: {
      haksuNo: string;
      suupNo: string;
      gwamokNm: string;
      hakjeom: number;
      daepyoGangsaNm: string;
      suupTimes: string;
      jehanInwon: string;
    }) => {
      const {
        haksuNo,
        suupNo,
        gwamokNm,
        hakjeom,
        daepyoGangsaNm,
        suupTimes,
        jehanInwon,
      } = e;
      const inwonInfo = jehanInwon.split("/");
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
        },
        update: {
          haksuNo,
          gwamokNm,
          hakjeom,
          daepyoGangsaNm,
          suupTimes,
          currentInwon,
          limitInwon,
        },
        where: {
          suupNo,
        },
      });
    }
  );
};

export const getLimitLecture = async () => {
  return client.$queryRaw`SELECT * FROM "Lecture" WHERE "limitInwon" <= "currentInwon"`;
};

export const getFullSoonLecture = async () => {
  return client.$queryRaw`SELECT *
  FROM "Lecture"
  WHERE "limitInwon" > "currentInwon"
  ORDER BY "limitInwon" - "currentInwon"`;
};
