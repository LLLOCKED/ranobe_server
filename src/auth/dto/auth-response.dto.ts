import { User } from ".prisma/client";

export class AuthRegResponse {
  message: string;
}

export class AuthLoginResponse {
  token: string;
  message: string;
}