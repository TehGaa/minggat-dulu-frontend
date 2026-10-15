/**
 * Shared constants for legal pages (Privacy Policy, Terms of Service) and the global footer.
 * Keep these in one place so both documents always stay consistent.
 */
export const APP_NAME = 'Minggat Dulu';
export const CONTACT_EMAIL = 'steven.ys1010@gmail.com';

export const PRIVACY_EFFECTIVE_DATE = 'October 15, 2026';
export const TERMS_EFFECTIVE_DATE = 'October 15, 2026';

export const LEGAL_LINKS = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
] as const;
