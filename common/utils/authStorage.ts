import { tokenStorage, TokenOptions } from './tokenStorage';
import { userStorage } from './userStorage';
import { UserData } from '@/common/types/UserData';

export interface AuthSessionData {
  access: string;
  refresh: string;
  user?: UserData;
}

export const authStorage = {
  saveSession(
    session: AuthSessionData,
    tokenOptions?: TokenOptions
  ): void {
    tokenStorage.setTokens(
      { access: session.access, refresh: session.refresh },
      tokenOptions
    );
    if (session.user) {
      userStorage.setUser(session.user);
    }
  },

  loadSession(): {
    access: string | null;
    refresh: string | null;
    user: UserData | null;
  } {
    return {
      access: tokenStorage.getAccessToken(),
      refresh: tokenStorage.getRefreshToken(),
      user: userStorage.getUser<UserData>(),
    };
  },

  clearSession(): void {
    tokenStorage.clearTokens();
    userStorage.clearUser();
  },

  isAuthenticated(): boolean {
    return tokenStorage.hasAccessToken();
  },
};
