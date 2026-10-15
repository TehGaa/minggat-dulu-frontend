import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/module/Navbar';
import { APP_NAME, CONTACT_EMAIL, PRIVACY_EFFECTIVE_DATE as EFFECTIVE_DATE } from '@/common/constants/legal';

export const metadata: Metadata = {
    title: `Privacy Policy | ${APP_NAME}`,
    description: `Learn how ${APP_NAME}, a non-commercial personal portfolio project, handles your data. We only store your email address when you sign in with Google, and never sell or share it.`,
    robots: { index: true, follow: true },
};

const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'google-user-data', title: 'Google User Data' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'sharing', title: 'Sharing & Disclosure' },
    { id: 'storage-security', title: 'Storage & Security' },
    { id: 'retention-deletion', title: 'Retention & Deletion' },
    { id: 'disclaimer', title: 'Disclaimer of Liability' },
    { id: 'children', title: "Children's Privacy" },
    { id: 'changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
];

const highlights = [
    {
        title: 'Email only',
        text: 'The only personal data we store is your email address.',
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
            </svg>
        ),
    },
    {
        title: 'Never sold',
        text: 'We do not sell, rent, or share your data for advertising.',
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: 'Delete anytime',
        text: 'Request deletion or revoke access from your Google Account.',
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
        ),
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="privacy-page">
            <Navbar variant="solid" showCurrency={false} />

            <header className="privacy-hero">
                <div className="privacy-hero-inner">
                    <span className="privacy-badge">Legal</span>
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <p className="privacy-subtitle">
                        Your privacy matters. Here&apos;s exactly what {APP_NAME} collects, why, and how you stay in control.
                    </p>
                    <p className="privacy-meta">Effective date: {EFFECTIVE_DATE}</p>
                </div>
            </header>

            <div className="privacy-layout">
                <aside className="privacy-toc" aria-label="Table of contents">
                    <p className="privacy-toc-title">On this page</p>
                    <nav>
                        <ol>
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} id={`toc-${s.id}`}>{s.title}</a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </aside>

                <main className="privacy-content">
                    <div className="privacy-highlights">
                        {highlights.map((h) => (
                            <div key={h.title} className="privacy-highlight">
                                <div className="privacy-highlight-icon">{h.icon}</div>
                                <div>
                                    <h3>{h.title}</h3>
                                    <p>{h.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <section id="overview" className="privacy-section">
                        <h2>1. Overview</h2>
                        <p>
                            This Privacy Policy explains how {APP_NAME} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
                            uses, and protects information when you use our website and services (the &quot;Service&quot;),
                            including when you sign in using your Google account. By using the Service, you agree to the
                            practices described in this policy and to our <Link href="/terms">Terms of Service</Link>.
                        </p>
                        <div className="privacy-callout">
                            <p>
                                <strong>{APP_NAME} is a non-commercial, personal project.</strong> It was built solely to
                                demonstrate software development skills to potential recruiters and employers. It is not a
                                business, does not sell any products or services, does not process payments, and does not
                                generate revenue from your data in any way.
                            </p>
                        </div>
                        <p>
                            We follow a <strong>data-minimization</strong> approach: we only collect what is strictly
                            necessary to let you sign in and use your account.
                        </p>
                    </section>

                    <section id="information-we-collect" className="privacy-section">
                        <h2>2. Information We Collect</h2>
                        <p>When you sign in with Google, we store <strong>only your email address</strong>.</p>
                        <ul>
                            <li>
                                <strong>Email address</strong> &mdash; used as your unique account identifier so you can sign in
                                and access your account.
                            </li>
                        </ul>
                        <p>We do <strong>not</strong> store:</p>
                        <ul>
                            <li>Your Google password (authentication is handled entirely by Google).</li>
                            <li>Your contacts, calendar, Drive files, Gmail messages, or any other Google account data.</li>
                            <li>Payment card details, government ID numbers, or precise location data.</li>
                        </ul>
                        <p>
                            To keep you signed in, a session token is saved in your browser&apos;s local storage. This token
                            stays on your device and can be cleared at any time by logging out or clearing your browser data.
                        </p>
                    </section>

                    <section id="google-user-data" className="privacy-section">
                        <h2>3. Google User Data</h2>
                        <p>
                            {APP_NAME} uses Google OAuth 2.0 solely for authentication. During sign-in, Google may share basic
                            profile information associated with the requested scopes (such as your email address). From this
                            information, we <strong>retain only your email address</strong>; any other basic profile
                            information is not stored.
                        </p>
                        <div className="privacy-callout">
                            <p>
                                {APP_NAME}&apos;s use and transfer of information received from Google APIs to any other app will
                                adhere to the{' '}
                                <a
                                    href="https://developers.google.com/terms/api-services-user-data-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google API Services User Data Policy
                                </a>
                                , including the Limited Use requirements.
                            </p>
                        </div>
                        <p>Specifically, we do not:</p>
                        <ul>
                            <li>Use Google user data for advertising, retargeting, or profiling.</li>
                            <li>Sell Google user data or transfer it to data brokers or information resellers.</li>
                            <li>Allow humans to read your data, except with your explicit consent, for security purposes, or to comply with the law.</li>
                            <li>Use Google user data to train artificial intelligence or machine learning models.</li>
                        </ul>
                    </section>

                    <section id="how-we-use" className="privacy-section">
                        <h2>4. How We Use Your Information</h2>
                        <p>Your email address is used only to:</p>
                        <ul>
                            <li>Create and identify your account.</li>
                            <li>Authenticate you when you sign in.</li>
                            <li>Contact you about important account or service-related matters, when necessary.</li>
                        </ul>
                        <p>We do not use your email for marketing without your explicit consent.</p>
                    </section>

                    <section id="sharing" className="privacy-section">
                        <h2>5. Sharing &amp; Disclosure</h2>
                        <p>
                            We do <strong>not</strong> sell, rent, or trade your personal information. We may disclose your
                            information only in the following limited cases:
                        </p>
                        <ul>
                            <li>
                                <strong>Legal requirements</strong> &mdash; when required by law, regulation, court order, or a
                                valid request from government authorities.
                            </li>
                            <li>
                                <strong>Protection of rights</strong> &mdash; to protect the safety, rights, or property of{' '}
                                {APP_NAME}, our users, or the public.
                            </li>
                            <li>
                                <strong>Infrastructure providers</strong> &mdash; trusted hosting providers that store data on our
                                behalf and are not permitted to use it for any other purpose.
                            </li>
                        </ul>
                    </section>

                    <section id="storage-security" className="privacy-section">
                        <h2>6. Storage &amp; Security</h2>
                        <p>
                            We use reasonable technical and organizational measures to protect your information, including
                            encrypted connections (HTTPS) and restricted access to our systems. However, no method of
                            transmission over the internet or electronic storage is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    <section id="retention-deletion" className="privacy-section">
                        <h2>7. Retention &amp; Deletion</h2>
                        <p>
                            We keep your email address for as long as your account exists. You can ask us to delete your
                            account and associated data at any time by emailing{' '}
                            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will process deletion requests within a
                            reasonable time, typically within 30 days.
                        </p>
                        <p>
                            You can also revoke {APP_NAME}&apos;s access to your Google account at any time from your{' '}
                            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                                Google Account permissions page
                            </a>
                            .
                        </p>
                    </section>

                    <section id="disclaimer" className="privacy-section privacy-section-warning">
                        <h2>8. Disclaimer of Liability</h2>
                        <p>
                            The Service is provided on an <strong>&quot;as is&quot; and &quot;as available&quot;</strong> basis,
                            without warranties of any kind, either express or implied. As a non-commercial portfolio
                            project, the Service may be modified, reset, suspended, or shut down at any time without notice,
                            and there is no guarantee of uptime, support, or data persistence.
                        </p>
                        <p>
                            To the maximum extent permitted by applicable law, {APP_NAME} and its operators shall{' '}
                            <strong>not be responsible or liable for any loss, corruption, or unavailability of data</strong>,
                            including data loss resulting from technical failures, service interruptions, security incidents,
                            third-party actions, or any other cause. You are responsible for keeping your own copies of any
                            information that is important to you.
                        </p>
                    </section>

                    <section id="children" className="privacy-section">
                        <h2>9. Children&apos;s Privacy</h2>
                        <p>
                            The Service is not directed to children under the age of 13, and we do not knowingly collect
                            personal information from children. If you believe a child has provided us with their information,
                            please contact us and we will delete it.
                        </p>
                    </section>

                    <section id="changes" className="privacy-section">
                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. When we do, we will revise the effective date
                            at the top of this page. Continued use of the Service after changes take effect means you accept
                            the updated policy.
                        </p>
                    </section>

                    <section id="contact" className="privacy-section">
                        <h2>11. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy or your data, reach out to us:</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="privacy-contact-card" id="privacy-contact-email">
                            <span className="privacy-contact-label">Email</span>
                            <span className="privacy-contact-value">{CONTACT_EMAIL}</span>
                        </a>
                    </section>
                </main>
            </div>
        </div>
    );
}