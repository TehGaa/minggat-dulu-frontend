"use client"

import { createContext, useContext, useEffect, useRef } from 'react';
import ChildrenProps from '@/common/types/ChildrenProps';
import { useUserContext } from './UserContext';
import { tokenStorage } from '@/common/utils';

export const RefreshContext = createContext({});

export const useRefreshContext = () => useContext(RefreshContext);

const ONE_MINUTE_MS = 60 * 1000;

const CHECK_INTERVAL_MS = 5 * 1000;

export const RefreshContextProvider: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const { isAuthenticated, refreshFunc, logout } = useUserContext();
    const isRefreshing = useRef(false);

    useEffect(() => {
        if (!isAuthenticated) return;

        const checkAndRefreshToken = async () => {
            if (isRefreshing.current) return;

            const remaining = tokenStorage.getAccessTokenTimeRemaining();

            if (remaining === null || remaining <= ONE_MINUTE_MS) {
                try {
                    isRefreshing.current = true;
                    await refreshFunc();
                } catch (error: any) {
                    console.error('Auto refresh token failed:', error);
                    if (error?.status === 401 || error?.status === 403 || error?.message?.includes('Refresh failed')) {
                        await logout();
                    }
                } finally {
                    isRefreshing.current = false;
                }
            }
        };

        checkAndRefreshToken();

        const interval = setInterval(checkAndRefreshToken, CHECK_INTERVAL_MS);

        const handleVisibilityOrFocus = () => {
            if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
                checkAndRefreshToken();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityOrFocus);
        window.addEventListener('focus', handleVisibilityOrFocus);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
            window.removeEventListener('focus', handleVisibilityOrFocus);
        };
    }, [isAuthenticated, refreshFunc, logout]);

    return (
        <RefreshContext.Provider value={{}}>
            {children}
        </RefreshContext.Provider>
    );
};
