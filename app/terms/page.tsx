import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/module/Navbar';
import { APP_NAME, CONTACT_EMAIL, TERMS_EFFECTIVE_DATE } from '@/common/constants/legal';

export const metadata: Metadata = {
    title: `Terms of Service | ${APP_NAME}`,
    description: `The terms that govern your use of ${APP_NAME}, a free, non-commercial personal portfolio project built to showcase software development skills.`,
    robots: { index: true, follow: true },
};

const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'about', title: 'About the Service' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'accounts', title: 'Accounts & Google Sign-In' },
    { id: 'acceptable-use', title: 'Acceptable Use' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'privacy', title: 'Privacy' },
    { id: 'warranties', title: 'Disclaimer of Warranties' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'changes', title: 'Changes to These Terms' },
    { id: 'contact', title: 'Contact Us' },
];

const highlights = [
    {
        title: 'Free & non-commercial',
        text: 'A personal portfolio project. No fees, no payments, no ads.',
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
    {
        title: 'Demo only',
        text: 'No real tickets or bookings are sold or issued.',
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.8 1.8c-.2.2-.2.5 0 .7l7.5 3.5-3.5 3.5-4-1c-.3-.1-.6 0-.8.2l-1.8 1.8c-.2.2 0 .5.3.6l5.5 1.5 1.5 5.5c.1.3.4.5.6.3l1.8-1.8c.2-.2.3-.5.2-.8l-1-4 3.5-3.5 3.5 7.5c.2.2.5.2.7 0l1.8-1.8c.3-.2.6-.6.5-1.1z" />
            </svg>
        ),
    },
    {
        title: 'Use at your own risk',
        text: 'Provided “as is”, with no guarantee of uptime or data.',
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
            </svg>
        ),
    },
];

export default function TermsOfServicePage() {
    return (
        <div className="privacy-page">
            <Navbar variant="solid" showCurrency={false} />

            <header className="privacy-hero">
                <div className="privacy-hero-inner">
                    <span className="privacy-badge">Legal</span>
                    <h1 className="privacy-title">Terms of Service</h1>
                    <p className="privacy-subtitle">
                        The ground rules for using {APP_NAME}. Short version: it&apos;s a free portfolio project, so please use
                        it kindly and at your own risk.
                    </p>
                    <p className="privacy-meta">Effective date: {TERMS_EFFECTIVE_DATE}</p>
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

                    <section id="acceptance" className="privacy-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            These Terms of Service (&quot;Terms&quot;) govern your access to and use of {APP_NAME} (&quot;we&quot;,
                            &quot;us&quot;, or &quot;our&quot;), including its website and related services (the &quot;Service&quot;).
                            By accessing the Service or signing in with your Google account, you agree to be bound by these
                            Terms and by our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use
                            the Service.
                        </p>
                    </section>

                    <section id="about" className="privacy-section">
                        <h2>2. About the Service</h2>
                        <div className="privacy-callout">
                            <p>
                                <strong>{APP_NAME} is a non-commercial, personal project.</strong> It was built solely to
                                demonstrate software development skills to potential recruiters and employers. It is not a
                                business, does not sell any products or services, and does not process payments.
                            </p>
                        </div>
                        <p>Because the Service is a demonstration, please note that:</p>
                        <ul>
                            <li>
                                <strong>No real bookings are made.</strong> Flight, train, bus, or any other travel results are
                                for demonstration purposes only. No tickets are sold, reserved, or issued.
                            </li>
                            <li>
                                Any prices, schedules, availability, or destination information shown may be sample data and
                                may be inaccurate, incomplete, or outdated. Do not rely on it for real travel plans.
                            </li>
                            <li>
                                Features may change, break, or be removed at any time as the project evolves.
                            </li>
                        </ul>
                    </section>

                    <section id="eligibility" className="privacy-section">
                        <h2>3. Eligibility</h2>
                        <p>
                            You must be at least 13 years old to use the Service. By using the Service, you confirm that you
                            meet this requirement.
                        </p>
                    </section>

                    <section id="accounts" className="privacy-section">
                        <h2>4. Accounts &amp; Google Sign-In</h2>
                        <p>
                            You may sign in using your Google account. Authentication is handled by Google, and we never see
                            or store your Google password. As described in our <Link href="/privacy">Privacy Policy</Link>, the
                            only personal data we store is your <strong>email address</strong>.
                        </p>
                        <p>You are responsible for:</p>
                        <ul>
                            <li>Keeping your Google account and device secure.</li>
                            <li>All activity that occurs under your account.</li>
                            <li>
                                Letting us know at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> if you suspect any
                                unauthorized use of your account.
                            </li>
                        </ul>
                    </section>

                    <section id="acceptable-use" className="privacy-section">
                        <h2>5. Acceptable Use</h2>
                        <p>When using the Service, you agree not to:</p>
                        <ul>
                            <li>Use the Service for any unlawful, harmful, or fraudulent purpose.</li>
                            <li>Attempt to gain unauthorized access to the Service, its servers, or other users&apos; accounts.</li>
                            <li>Interfere with or disrupt the Service, including through malware, spam, or excessive automated requests.</li>
                            <li>Scrape, reverse engineer, or misuse the Service in ways that could harm it or its users.</li>
                            <li>Impersonate any person or misrepresent your affiliation with anyone.</li>
                        </ul>
                    </section>

                    <section id="intellectual-property" className="privacy-section">
                        <h2>6. Intellectual Property</h2>
                        <p>
                            The {APP_NAME} name, logo, design, and original source code are the work of the project&apos;s
                            developer. You may view and interact with the Service for personal, non-commercial purposes, such
                            as evaluating the developer&apos;s skills.
                        </p>
                        <p>
                            Third-party names, logos, images, and trademarks (including Google) that appear in the Service
                            belong to their respective owners and are used for identification or demonstration purposes only.
                            Their appearance does not imply endorsement or affiliation.
                        </p>
                    </section>

                    <section id="third-party" className="privacy-section">
                        <h2>7. Third-Party Services</h2>
                        <p>
                            The Service relies on third-party services, such as Google Sign-In and hosting providers. Your use
                            of those services is governed by their own terms and privacy policies, including the{' '}
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                                Google Terms of Service
                            </a>
                            . We are not responsible for the availability, content, or practices of any third-party service.
                        </p>
                    </section>

                    <section id="privacy" className="privacy-section">
                        <h2>8. Privacy</h2>
                        <p>
                            Your privacy is important to us. Our <Link href="/privacy">Privacy Policy</Link> explains what we
                            collect (only your email address), how we use it, and how you can request deletion. By using the
                            Service, you also agree to the Privacy Policy.
                        </p>
                    </section>

                    <section id="warranties" className="privacy-section privacy-section-warning">
                        <h2>9. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided on an <strong>&quot;as is&quot; and &quot;as available&quot;</strong> basis,
                            without warranties of any kind, whether express or implied, including warranties of
                            merchantability, fitness for a particular purpose, accuracy, or non-infringement.
                        </p>
                        <p>
                            As a non-commercial portfolio project, the Service may be modified, reset, suspended, or shut down
                            at any time without notice, and there is <strong>no guarantee of uptime, support, or data
                            persistence</strong>.
                        </p>
                    </section>

                    <section id="liability" className="privacy-section privacy-section-warning">
                        <h2>10. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable law, {APP_NAME} and its developer shall{' '}
                            <strong>not be responsible or liable for any loss, corruption, or unavailability of data</strong>,
                            or for any indirect, incidental, special, consequential, or punitive damages arising from or
                            related to your use of, or inability to use, the Service.
                        </p>
                        <p>
                            This includes, without limitation, losses resulting from technical failures, service
                            interruptions, security incidents, third-party actions, reliance on demonstration content, or any
                            other cause. Because the Service is provided free of charge, you use it entirely at your own risk.
                        </p>
                    </section>

                    <section id="termination" className="privacy-section">
                        <h2>11. Termination</h2>
                        <p>
                            You may stop using the Service at any time. You can also request deletion of your account and
                            email address by contacting <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or revoke
                            access from your{' '}
                            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                                Google Account permissions page
                            </a>
                            .
                        </p>
                        <p>
                            We may suspend or terminate your access to the Service at any time, with or without notice, if you
                            violate these Terms or if the Service is discontinued.
                        </p>
                    </section>

                    <section id="changes" className="privacy-section">
                        <h2>12. Changes to These Terms</h2>
                        <p>
                            We may update these Terms from time to time. When we do, we will revise the effective date at the
                            top of this page. Continued use of the Service after changes take effect means you accept the
                            updated Terms.
                        </p>
                    </section>

                    <section id="contact" className="privacy-section">
                        <h2>13. Contact Us</h2>
                        <p>If you have any questions about these Terms, reach out to us:</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="privacy-contact-card" id="terms-contact-email">
                            <span className="privacy-contact-label">Email</span>
                            <span className="privacy-contact-value">{CONTACT_EMAIL}</span>
                        </a>
                    </section>
                </main>
            </div>
        </div>
    );
}
