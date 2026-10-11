'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/context/UserContext';

export interface NavbarActionItem {
  id?: string;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger' | 'logout';
  className?: string;
  icon?: React.ReactNode;
}

export interface NavbarTabItem {
  id?: string;
  label: string;
  value?: string;
}

export interface NavbarProps {
  /**
   * Navbar visual mode:
   * - 'auto': transparent initially, turns solid on scroll (ideal for hero pages)
   * - 'solid': always solid with background
   * - 'transparent': always transparent
   */
  variant?: 'auto' | 'solid' | 'transparent';

  /**
   * Custom action slot to completely customize the right side of the navbar.
   * If provided, overrides default actions.
   */
  actions?: React.ReactNode;

  /**
   * Declarative list of action buttons to render in the right-side section.
   */
  actionItems?: NavbarActionItem[];

  /**
   * Optional tabs to display on the bottom section of the navbar.
   * If omitted, the bottom section will not be rendered.
   */
  tabs?: (string | NavbarTabItem)[];

  /**
   * Active tab identifier.
   */
  activeTab?: string;

  /**
   * Callback invoked when a tab is selected.
   */
  onTabChange?: (tab: string) => void;

  /**
   * Custom bottom section slot.
   */
  bottomContent?: React.ReactNode;

  /**
   * Whether to display the currency selector (default: true).
   */
  showCurrency?: boolean;

  /**
   * Currency code (default: 'IDR').
   */
  currency?: string;

  /**
   * Currency flag icon or emoji (default: '🇮🇩').
   */
  currencyFlag?: string;

  /**
   * Destination URL when clicking the brand logo (default: '/').
   */
  logoHref?: string;

  /**
   * Additional container class name.
   */
  className?: string;
}

export const NavbarButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger' | 'logout';
  className?: string;
}> = ({ children, href, onClick, variant = 'default', className = '' }) => {
  const variantClass = variant === 'logout' || variant === 'danger' ? 'logout-btn' : '';
  const combinedClass = `nav-btn ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClass} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClass} onClick={onClick}>
      {children}
    </button>
  );
};

export const CurrencySelector: React.FC<{
  flag?: string;
  currency?: string;
  onClick?: () => void;
}> = ({ flag = '🇮🇩', currency = 'IDR', onClick }) => {
  return (
    <div className="currency-selector" onClick={onClick} role="button" tabIndex={0}>
      <span className="flag">{flag}</span> {currency}
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  variant = 'auto',
  actions,
  actionItems,
  tabs,
  activeTab,
  onTabChange,
  bottomContent,
  showCurrency = true,
  currency = 'IDR',
  currencyFlag = '🇮🇩',
  logoHref = '/',
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useUserContext();

  useEffect(() => {
    if (variant !== 'auto') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  const isSolid = variant === 'solid' || (variant === 'auto' && isScrolled);

  const renderDefaultActions = () => {
    return (
      <>
        {showCurrency && (
          <CurrencySelector flag={currencyFlag} currency={currency} />
        )}
        <NavbarButton href="/bookings">Bookings</NavbarButton>
        {isAuthenticated ? (
          <>
            <span
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                opacity: 0.9,
              }}
            >
              {user?.username || 'Account'}
            </span>
            <NavbarButton variant="logout" onClick={logout}>
              Logout
            </NavbarButton>
          </>
        ) : (
          <NavbarButton href="/login" variant="logout">
            Login
          </NavbarButton>
        )}
      </>
    );
  };

  const renderActionItems = () => {
    return (
      <>
        {showCurrency && (
          <CurrencySelector flag={currencyFlag} currency={currency} />
        )}
        {actionItems?.map((item, index) => (
          <NavbarButton
            key={item.id || item.label || index}
            href={item.href}
            onClick={item.onClick}
            variant={item.variant}
            className={item.className}
          >
            {item.icon && <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>}
            {item.label}
          </NavbarButton>
        ))}
      </>
    );
  };

  const hasBottomSection = Boolean(bottomContent || (tabs && tabs.length > 0));

  return (
    <nav
      className={`sticky-navbar ${isSolid ? 'navbar-solid' : 'navbar-transparent'} ${className}`.trim()}
    >
      {/* Top Section */}
      <div className="navbar-top">
        {/* Brand Logo */}
        <Link href={logoHref} style={{ textDecoration: 'none' }}>
          <div className="navbar-brand" style={{ display: 'grid', cursor: 'pointer' }}>
            {/* White Logo (State 1: Transparent Navbar) */}
            <img
              src="/img/minggat_dulu_black_screen_removed_bg.png"
              alt="Minggat Dulu Logo"
              style={{
                gridArea: '1 / 1',
                height: '44px',
                width: 'auto',
                opacity: isSolid ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            {/* Color Logo (State 2: Solid Navbar) */}
            <img
              src="/img/minggat_dulu_green_screen_removed_bg.png"
              alt="Minggat Dulu Logo"
              style={{
                gridArea: '1 / 1',
                height: '44px',
                width: 'auto',
                opacity: isSolid ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>
        </Link>

        {/* Dynamic Action Buttons */}
        <div className="navbar-actions">
          {actions
            ? actions
            : actionItems
              ? renderActionItems()
              : renderDefaultActions()}
        </div>
      </div>

      {/* Dynamic Bottom Section */}
      {hasBottomSection && (
        <div className="navbar-bottom">
          {bottomContent ? (
            bottomContent
          ) : (
            tabs?.map((tab) => {
              const label = typeof tab === 'string' ? tab : tab.label;
              const value = typeof tab === 'string' ? tab : tab.value || tab.label;
              const isActive = activeTab === value;

              return (
                <button
                  key={value}
                  type="button"
                  className={`nav-tab ${isActive ? 'active' : ''}`}
                  onClick={() => onTabChange?.(value)}
                >
                  {label}
                </button>
              );
            })
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
