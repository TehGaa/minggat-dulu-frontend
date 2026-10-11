'use client';

import React from 'react';

interface SplashScreenProps {
  message?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  message = 'Preparing your journey...',
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F7F4',
        fontFamily: "'Outfit', sans-serif",
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes floatLogo {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
        }

        @keyframes progressShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
      `}</style>

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216, 92, 65, 0.15) 0%, rgba(30, 63, 64, 0.05) 60%, transparent 80%)',
          animation: 'pulseGlow 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Brand Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'floatLogo 2.5s ease-in-out infinite',
          zIndex: 1,
        }}
      >
        <img
          src="/img/minggat_dulu_green_screen_removed_bg.png"
          alt="Minggat Dulu Logo"
          style={{
            height: '76px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 25px rgba(30, 63, 64, 0.12))',
          }}
        />
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          marginTop: '2.5rem',
          width: '180px',
          height: '5px',
          backgroundColor: '#e5e7eb',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '45%',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #D85C41, #1E3F40)',
            animation: 'progressShimmer 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
      </div>

      {/* Subtitle / Loading label */}
      <p
        style={{
          marginTop: '1.25rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: '#1E3F40',
          opacity: 0.75,
          zIndex: 1,
        }}
      >
        {message}
      </p>
    </div>
  );
};

export default SplashScreen;
