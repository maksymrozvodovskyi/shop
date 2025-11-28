import { nextServer } from "../api/nextServer";

export type LoginRequestType = {
  identifier: string;
  password: string;
};

export type StrapiLoginResponseType = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export async function login(data: LoginRequestType) {
  const res = await nextServer.post<StrapiLoginResponseType>(
    "/auth/local",
    data
  );
  return res.data;
}
