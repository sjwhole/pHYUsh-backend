import axios from "axios";

export const getSugangInfo = async (lectureName: string) => {
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
