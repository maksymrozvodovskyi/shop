import { nextServer } from "../api/nextServer";

export type LoginRequestType = {
  identifier: string;
  password: string;
};

export type StrapiLoginUserType = {
  id: number;
  documentId: string;
  username: string;
  email: string;
};

export type StrapiLoginResponseType = {
  jwt: string;
  user: StrapiLoginUserType;
};

export async function login(data: LoginRequestType) {
  const res = await nextServer.post<StrapiLoginResponseType>(
    "/auth/local",
    data
  );
  return res.data;
}
