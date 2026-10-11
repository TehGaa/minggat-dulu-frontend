import { cookies, CookieOptions } from './cookies';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export interface TokenOptions {
  accessDays?: number;
  refreshDays?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export const tokenStorage = {
  getAccessToken(): string | null {
    return cookies.get(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string, options: CookieOptions = {}): void {
    const days = options.days !== undefined ? options.days : 1;
    cookies.set(ACCESS_TOKEN_KEY, token, {
      days,
      path: options.path ?? '/',
      secure: options.secure,
      sameSite: options.sameSite ?? 'Lax',
    });
  },

  removeAccessToken(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    cookies.remove(ACCESS_TOKEN_KEY, options);
  },

  getRefreshToken(): string | null {
    return cookies.get(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string, options: CookieOptions = {}): void {
    const days = options.days !== undefined ? options.days : 7;
    cookies.set(REFRESH_TOKEN_KEY, token, {
      days,
      path: options.path ?? '/',
      secure: options.secure,
      sameSite: options.sameSite ?? 'Lax',
    });
  },

  removeRefreshToken(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    cookies.remove(REFRESH_TOKEN_KEY, options);
  },


  getTokens(): { access: string | null; refresh: string | null } {
    return {
      access: this.getAccessToken(),
      refresh: this.getRefreshToken(),
    };
  },

  setTokens(
    tokens: { access: string; refresh: string },
    options: TokenOptions = {}
  ): void {
    this.setAccessToken(tokens.access, {
      days: options.accessDays ?? 1,
      path: options.path,
      secure: options.secure,
      sameSite: options.sameSite,
    });
    this.setRefreshToken(tokens.refresh, {
      days: options.refreshDays ?? 7,
      path: options.path,
      secure: options.secure,
      sameSite: options.sameSite,
    });
  },

  clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  },

  hasAccessToken(): boolean {
    return Boolean(this.getAccessToken());
  },


  hasRefreshToken(): boolean {
    return Boolean(this.getRefreshToken());
  },
};
