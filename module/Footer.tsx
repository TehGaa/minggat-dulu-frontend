import Link from 'next/link';
import { APP_NAME, CONTACT_EMAIL, LEGAL_LINKS } from '@/common/constants/legal';

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="site-footer-brand">
                    <span className="site-footer-name">
                        <span className="brand-text-minggat">Minggat</span>{' '}
                        <span className="brand-text-dulu">Dulu</span>
                    </span>
                    <p className="site-footer-note">
                        A non-commercial personal portfolio project. No real bookings are made.
                    </p>
                </div>

                <nav className="site-footer-links" aria-label="Legal">
                    {LEGAL_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} id={`footer-link-${link.href.slice(1)}`}>
                            {link.label}
                        </Link>
                    ))}
                    <a href={`mailto:${CONTACT_EMAIL}`} id="footer-link-contact">
                        Contact
                    </a>
                </nav>
            </div>
            <div className="site-footer-bottom">
                <p>&copy; 2026 {APP_NAME}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
