import { cookies, CookieOptions } from './cookies';

export const ACCESS_TOKEN_KEY = 'access_token';
export const ACCESS_TOKEN_EXP_KEY = 'access_token_exp';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export interface TokenOptions {
  accessMinutes?: number;
  accessDays?: number;
  refreshDays?: number;
  refreshMinutes?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

function parseJwtExpiration(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    if (typeof parsed.exp === 'number') {
      return parsed.exp * 1000;
    }
  } catch {
    // If not a valid JWT or cannot parse, safely ignore
  }
  return null;
}

export const tokenStorage = {
  getAccessToken(): string | null {
    return cookies.get(ACCESS_TOKEN_KEY);
  },

  getAccessTokenExpiry(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    // Check JWT payload first if present
    const jwtExp = parseJwtExpiration(token);
    if (jwtExp !== null) {
      return jwtExp;
    }

    // Fall back to recorded expiration cookie
    const storedExp = cookies.get(ACCESS_TOKEN_EXP_KEY);
    if (storedExp) {
      const expNum = parseInt(storedExp, 10);
      if (!Number.isNaN(expNum)) {
        return expNum;
      }
    }

    return null;
  },

  getAccessTokenTimeRemaining(): number | null {
    const expiry = this.getAccessTokenExpiry();
    if (!expiry) return null;
    return Math.max(0, expiry - Date.now());
  },

  setAccessToken(token: string, options: CookieOptions = {}): void {
    const minutes = 0.5

    const expiryTime = Date.now() + minutes * 60 * 1000;

    cookies.set(ACCESS_TOKEN_KEY, token, {
      ...options,
      minutes,
      days: undefined,
      path: options.path ?? '/',
      secure: options.secure,
      sameSite: options.sameSite ?? 'Lax',
    });

    cookies.set(ACCESS_TOKEN_EXP_KEY, expiryTime.toString(), {
      ...options,
      minutes,
      days: undefined,
      path: options.path ?? '/',
      secure: options.secure,
      sameSite: options.sameSite ?? 'Lax',
    });
  },

  removeAccessToken(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    cookies.remove(ACCESS_TOKEN_KEY, options);
    cookies.remove(ACCESS_TOKEN_EXP_KEY, options);
  },

  removeRefreshToken(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    cookies.remove(REFRESH_TOKEN_KEY, options);
  },

  getTokens(): { access: string | null } {
    return {
      access: this.getAccessToken(),
    };
  },

  setTokens(
    tokens: { access: string; },
    options: TokenOptions = {}
  ): void {
    const accessMinutes =
      options.accessMinutes !== undefined
        ? options.accessMinutes
        : options.accessDays !== undefined
          ? options.accessDays * 24 * 60
          : 15;

    this.setAccessToken(tokens.access, {
      minutes: accessMinutes,
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
};
