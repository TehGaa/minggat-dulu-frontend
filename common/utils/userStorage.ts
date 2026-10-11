import { UserData } from '@/common/types/UserData';

export const USER_DATA_KEY = 'user_data';

export const userStorage = {
	getUser<T = UserData>(): T | null {
		if (typeof window === 'undefined') return null;

		try {
			const rawData = window.localStorage.getItem(USER_DATA_KEY);
			if (!rawData) return null;
			return JSON.parse(rawData) as T;
		} catch (error) {
			console.error('Failed to retrieve user data from localStorage:', error);
			return null;
		}
	},

	setUser<T = UserData>(userData: T): void {
		if (typeof window === 'undefined') return;

		try {
			window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
		} catch (error) {
			console.error('Failed to save user data to localStorage:', error);
		}
	},

	removeUser(): void {
		if (typeof window === 'undefined') return;

		try {
			window.localStorage.removeItem(USER_DATA_KEY);
		} catch (error) {
			console.error('Failed to remove user data from localStorage:', error);
		}
	},

	clearUser(): void {
		this.removeUser();
	},

	hasUser(): boolean {
		return this.getUser() !== null;
	},
};
