export interface CookieOptions {
  days?: number;
  minutes?: number;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Cookie management utilities for browser environment.
 * Includes SSR guards to prevent runtime exceptions in server-rendered environments.
 */
export const cookies = {
  /**
   * Retrieves a cookie value by name.
   */
  get(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const nameEQ = encodeURIComponent(name) + '=';
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  /**
   * Sets a cookie with customizable options (expiration, path, sameSite, secure).
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document === 'undefined') return;

    const {
      days,
      minutes,
      maxAge,
      path = '/',
      domain,
      secure = typeof window !== 'undefined' && window.location.protocol === 'https:',
      sameSite = 'Lax',
    } = options;

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;

    if (maxAge !== undefined) {
      cookieStr += `; max-age=${maxAge}`;
    } else if (minutes !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      cookieStr += `; expires=${date.toUTCString()}`;
    } else if (days !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      cookieStr += `; expires=${date.toUTCString()}`;
    }

    if (domain) {
      cookieStr += `; domain=${domain}`;
    }

    if (sameSite) {
      cookieStr += `; samesite=${sameSite}`;
    }

    if (secure) {
      cookieStr += '; secure';
    }

    document.cookie = cookieStr;
  },

  /**
   * Removes a cookie by expiring it immediately.
   */
  remove(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    if (typeof document === 'undefined') return;

    const { path = '/', domain } = options;
    let cookieStr = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;

    if (domain) {
      cookieStr += `; domain=${domain}`;
    }

    document.cookie = cookieStr;
  },
};
