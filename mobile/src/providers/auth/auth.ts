export class Auth {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;

  constructor(auth?: any) {
    if (auth) {
      this.accessToken = auth.access_token;
      this.expiresIn = auth.expires_in;
      this.refreshToken = auth.refresh_token;
      this.tokenType = auth.token_type;
    }
  }
}