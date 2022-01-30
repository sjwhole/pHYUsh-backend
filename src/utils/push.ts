import client from "../client";

export const getPushInfos = async (token: string) => {
  await client.token.upsert({
    where: { id: token },
    update: {},
    create: {
      id: token,
    },
  });

  return client.token.findUnique({
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

export const createPush = (token: string, suupNo: number) => {
  return client.push.upsert({
    where: {
      pushIdentifier: {
        TokenId: token,
        lectureSuupNo: suupNo,
      },
    },
    create: {
      TokenId: token,
      lectureSuupNo: suupNo,
    },
    update: {},
  });
};
