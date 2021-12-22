import client from "../client";

export const getPushInfos = async (token: string) => {
  await client.fCM.upsert({
    where: { id: token },
    update: {},
    create: {
      id: token,
    },
  });

  return client.fCM.findUnique({
    where: {
      id: token,
    },
    select: {
      pushes: {
        select: {
          Lecture: true,
        },
      },
    },
  });
};

export const createPush = (token: string, suupNo: string) => {
  return client.push.upsert({
    where: {
      pushIdentifier: {
        FCMId: token,
        lectureSuupNo: suupNo,
      },
    },
    create: {
      FCMId: token,
      lectureSuupNo: suupNo,
    },
    update: {},
  });
};
