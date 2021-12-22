import client from "../client";

export const registerFCM = (token: string) => {
  return client.fCM.create({
    data: {
      id: token,
    },
  });
};
