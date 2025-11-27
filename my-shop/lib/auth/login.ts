import { nextServer } from "../api/nextServer";

export type LoginRequest = {
  identifier: string;
  password: string;
};

export type StrapiLoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export async function login(data: LoginRequest) {
  const res = await nextServer.post<StrapiLoginResponse>("/auth/local", data);
  return res.data;
}
