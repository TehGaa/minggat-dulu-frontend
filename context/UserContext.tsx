'use client';

import ChildrenProps from '@/common/types/ChildrenProps';
import { UserData } from '@/common/types/UserData';
import { authStorage, tokenStorage, userStorage } from '@/common/utils';
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
    setTokens: (tokens: { access: string; refresh: string }) => void;
    setAuthSession: (session: { access: string; refresh: string; user?: UserData }) => void;
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
            // Sleep for 1 second to display the loading splash screen
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const session = authStorage.loadSession();

            if (session.access) {
                setAccess(session.access);
                setRefresh(session.refresh || '');
                setIsAuthenticated(true);
            }

            if (session.user) {
                setUser(session.user);
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    const setAuthSession = (session: { access: string; refresh: string; user?: UserData }) => {
        authStorage.saveSession(session);
        setAccess(session.access);
        setRefresh(session.refresh);
        setIsAuthenticated(true);
        if (session.user) {
            setUser(session.user);
        }
    };

    const handleSetTokens = (tokens: { access: string; refresh: string }) => {
        tokenStorage.setTokens(tokens);
        setAccess(tokens.access);
        setRefresh(tokens.refresh);
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
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refresh }),
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
        authStorage.clearSession();
        setUser(undefined);
        setAccess('');
        setRefresh('');
        setIsAuthenticated(false);
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
                const refresh = data?.refresh || data?.refreshToken || data?.refresh_token;
                const user = data?.user_data

                if (access) {
                    setAuthSession({
                        access,
                        refresh: refresh || '',
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
                body: JSON.stringify({ refresh_token: refresh }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || data?.detail || 'Refresh failed');
            } else {
                const access = data?.access || data?.accessToken || data?.access_token;
                const refresh = data?.refresh || data?.refreshToken || data?.refresh_token;
                const user = data?.user_data

                if (access) {
                    setAuthSession({
                        access,
                        refresh: refresh || '',
                        user,
                    });
                }

                return data;
            }
        } catch (error) {
            console.error('Refresh error:', error);
            throw error;
        }
    }

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
