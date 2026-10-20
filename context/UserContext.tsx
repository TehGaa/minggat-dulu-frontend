'use client';

import ChildrenProps from '@/common/types/ChildrenProps';
import { UserData } from '@/common/types/UserData';
import { authStorage, cookies, tokenStorage, userStorage } from '@/common/utils';
import { SplashScreen } from '@/module/SplashScreen';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState, useRef } from 'react';

interface UserValidateData {
    user: UserData | undefined;
    access: string;
    refresh: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: UserData | undefined) => void;
    setTokens: (tokens: { access: string }) => void;
    setAuthSession: (session: { access: string; user?: UserData }) => void;
    register: (query: any) => Promise<void>;
    login: (query: any) => Promise<any>;
    logout: () => void;
    refreshFunc: () => Promise<any>;
}

export const UserContext = createContext<UserValidateData>(
    {} as UserValidateData
);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<ChildrenProps> = ({
    children
}: ChildrenProps) => {
    const initialized = useRef(false);
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [access, setAccess] = useState('');
    const [refresh, setRefresh] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initAuth = async () => {
            const session = authStorage.loadSession();
            let currentUser = session.user;

            const userDataCookie = cookies.get('user_data');
            if (userDataCookie) {
                try {
                    const parsedUser = typeof userDataCookie === 'string' ? JSON.parse(userDataCookie) : userDataCookie;
                    userStorage.setUser(parsedUser);
                    currentUser = parsedUser;
                    cookies.remove('user_data');
                }
                catch (err) { }
            }

            const remaining = tokenStorage.getAccessTokenTimeRemaining();
            const hasValidAccessToken = Boolean(session.access && remaining !== null && remaining > 60 * 1000);

            if (hasValidAccessToken) {
                setAccess(session.access!);
                setIsAuthenticated(true);
            } else if (session.access || currentUser) {
                try {
                    const refreshData = await refreshFunc();
                    const newAccess = refreshData?.access || refreshData?.accessToken || refreshData?.access_token;
                    if (newAccess && refreshData?.user_data) {
                        currentUser = refreshData.user_data;
                    }
                } catch (err) {
                    console.warn('Session restoration failed, clearing session:', err);
                    authStorage.clearSession();
                    currentUser = null;
                    setIsAuthenticated(false);
                }
            }

            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(undefined);
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    const setAuthSession = (session: { access: string; user?: UserData }) => {
        authStorage.saveSession(session);
        setAccess(session.access);
        setIsAuthenticated(true);
        if (session.user) {
            setUser(session.user);
        }
    };

    const handleSetTokens = (tokens: { access: string }) => {
        tokenStorage.setTokens(tokens);
        setAccess(tokens.access);
        setIsAuthenticated(true);
    };

    const handleSetUser = (newUserData: UserData | undefined) => {
        if (newUserData) {
            userStorage.setUser(newUserData);
            setUser(newUserData);
        } else {
            userStorage.removeUser();
            setUser(undefined);
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refresh }),
            });
        }
        catch (error) {
            console.error('Logout error:', error);
        } finally {
            authStorage.clearSession();
            setUser(undefined);
            setAccess('');
            setRefresh('');
            setIsAuthenticated(false);
        }
    };

    const register = async (query: any) => {
        try {
            console.log(query);
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (query: any) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || data?.detail || 'Login failed');
            } else {
                const access = data?.access || data?.accessToken || data?.access_token;
                const user = data?.user_data

                if (access) {
                    setAuthSession({
                        access,
                        user,
                    });
                }

                return data;
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const refreshFunc = async () => {
        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                const error: any = new Error(data?.message || data?.detail || 'Refresh failed');
                error.status = response.status;
                throw error;
            } else {
                const access = data?.access || data?.accessToken || data?.access_token;
                const user = data?.user_data;

                if (access) {
                    setAuthSession({
                        access,
                        user,
                    });
                }

                return data;
            }
        } catch (error) {
            console.error('Refresh error:', error);
            throw error;
        }
    };

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <UserContext.Provider
            value={{
                user,
                access,
                refresh,
                isAuthenticated,
                isLoading,
                setUser: handleSetUser,
                setTokens: handleSetTokens,
                setAuthSession,
                register,
                login,
                logout,
                refreshFunc,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
