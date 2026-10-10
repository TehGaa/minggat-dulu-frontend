'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from './home/page';
import PreferencesPage from './preferences/page';

export default function Home() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [winSize, setWinSize] = useState({ w: 1000, h: 1000 });
  const [nextRoute, setNextRoute] = useState('/home');

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    setWinSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showLogin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Determine if user is first-time here (e.g. from backend response)
    // setNextRoute(isFirstTime ? '/preferences' : '/home');

    setIsLoggingIn(true);

    let start: number | null = null;

    const animate = (time: number) => {
      if (!start) start = time;
      const currentElapsed = time - start;
      setElapsed(currentElapsed);

      if (currentElapsed < 2500) {
        requestAnimationFrame(animate);
      } else {
        setShowLogin(false);
        router.push(nextRoute);
      }
    };
    requestAnimationFrame(animate);
  };

  const phase1Duration = 700;
  const phase2Duration = 1800;

  let phase = 0;
  let phase1Progress = 0;
  let zipProgress = 0;

  if (elapsed !== null) {
    if (elapsed < phase1Duration) {
      phase = 1;
      phase1Progress = elapsed / phase1Duration;
    } else {
      phase = 2;
      phase1Progress = 1;
      const rawProgress = Math.min((elapsed - phase1Duration) / phase2Duration, 1);
      // ease-in curve for swift unzipping
      zipProgress = rawProgress * rawProgress * rawProgress;
    }
  }

  // --- Zipper Math ---
  const planeY = phase === 2 ? -10 + zipProgress * 150 : -20;
  const displayPlaneY = phase === 2 ? planeY : 0;

  const zipTop = Math.min(100, zipProgress * 130);
  const zipBottom = Math.min(100, Math.max(0, (zipProgress - 0.7) * 400));

  const W = winSize.w;
  const H = winSize.h;
  const P_Y = (displayPlaneY / 100) * H;

  const gapRadius = (zipTop / 100) * (W / 2);
  const gapBottomRadius = (zipBottom / 100) * (W / 2);

  // Left Panel Coordinates (Global to screen, mapped to local inside path)
  const TR_x = W / 2 - gapRadius;
  const V_L_x = W / 2 - gapBottomRadius;
  const CP1_L_x = W / 2 - gapRadius - gapBottomRadius;
  const CP2_L_x = W / 2 - (gapRadius * 0.15) - gapBottomRadius;

  const TR = `${TR_x} 0`;
  const V_L = `${V_L_x} ${P_Y}`;
  const CP1_L = `${CP1_L_x} ${P_Y * 0.4}`;
  const CP2_L = `${CP2_L_x} ${P_Y * 0.8}`;

  // Right Panel Coordinates
  const TL_R_x = W / 2 + gapRadius;
  const V_R_x = W / 2 + gapBottomRadius;
  const CP1_R_x = W / 2 + gapRadius + gapBottomRadius;
  const CP2_R_x = W / 2 + (gapRadius * 0.15) + gapBottomRadius;

  const TL_R = `${TL_R_x} 0`;
  const V_R = `${V_R_x} ${P_Y}`;
  const CP1_R = `${CP1_R_x} ${P_Y * 0.4}`;
  const CP2_R = `${CP2_R_x} ${P_Y * 0.8}`;

  // Left clip uses local coordinates (0 to W/2)
  const leftClip = isLoggingIn && phase === 2 ? `path('M 0 0 L ${TR} C ${CP1_L}, ${CP2_L}, ${V_L} L ${V_L_x} ${H} L 0 ${H} Z')` : 'none';

  // Right clip uses local coordinates (0 to W/2, where 0 is center of screen)
  const W_half = W / 2;
  const R_TL = `${TL_R_x - W_half} 0`;
  const R_TR = `${W} 0`; // use W to heavily overshoot the right edge to prevent gap
  const R_BR = `${W} ${H}`;
  const R_BL = `${V_R_x - W_half} ${H}`;
  const R_V = `${V_R_x - W_half} ${P_Y}`;
  const R_CP1 = `${CP1_R_x - W_half} ${P_Y * 0.4}`;
  const R_CP2 = `${CP2_R_x - W_half} ${P_Y * 0.8}`;

  const rightClip = isLoggingIn && phase === 2 ? `path('M ${R_TL} L ${R_TR} L ${R_BR} L ${R_BL} L ${R_V} C ${R_CP2}, ${R_CP1}, ${R_TL} Z')` : 'none';

  // Bevel paths use global screen coordinates (0 to W)
  const leftBevelPath = `M ${TR} C ${CP1_L}, ${CP2_L}, ${V_L} L ${V_L_x} ${H}`;
  const rightBevelPath = `M ${TL_R} C ${CP1_R}, ${CP2_R}, ${V_R} L ${V_R_x} ${H}`;

  const planeOpacity = phase === 1 ? Math.min(phase1Progress * 3, 1) : 1;
  const planeScale = phase === 1 ? 1 + (1 - phase1Progress) : 1;

  const TEETH_COUNT = 24;
  const teeth = Array.from({ length: TEETH_COUNT }).map((_, i) => {
    const toothY = (i / TEETH_COUNT) * 100;

    const popDelay = i * (phase1Duration / TEETH_COUNT);
    let scale = 0;
    if (elapsed !== null && elapsed > popDelay) {
      const t = Math.min((elapsed - popDelay) / 250, 1);
      const c1 = 1.70158;
      const c3 = c1 + 1;
      scale = t === 1 ? 1 : 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    let outTranslateX = 0;
    let outRotate = 0;
    let opacity = 1;
    if (phase === 2 && displayPlaneY > toothY) {
      const outT = Math.min((displayPlaneY - toothY) / 10, 1);
      scale = Math.max(0, 1 - outT);
      outTranslateX = outT * 60;
      outRotate = outT * 60;
      opacity = 1 - outT;
    }

    return { id: i, toothY, scale, outTranslateX, outRotate, opacity };
  });

  const seamHeight = phase >= 1 ? Math.min(elapsed! / 200, 1) * 100 : 0;
  const seamTop = phase === 2 ? Math.max(0, displayPlaneY) : 0;

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Page (Z-Index 1) - Dynamically Renders */}
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: showLogin ? 'none' : 'auto' }}>
        {nextRoute === '/preferences' ? <PreferencesPage /> : <HomePage />}
      </div>

      {/* Foreground Login Overlay (Z-Index 50) */}
      {showLogin && (
        <div className={`split-container ${isLoggingIn ? 'zipping' : ''}`} style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          {/* Left Side - Vibrant & Playful */}
          <div
            className="split-left"
            style={{
              clipPath: leftClip,
              WebkitClipPath: leftClip,
              filter: isLoggingIn && phase === 2 ? 'drop-shadow(15px 0 25px rgba(0,0,0,0.8))' : 'none',
              transition: 'none'
            }}
          >
            <div className="characters-container">
              {/* Airplane Logo */}
              <div className="character char-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.8 1.8c-.2.2-.2.5 0 .7l7.5 3.5-3.5 3.5-4-1c-.3-.1-.6 0-.8.2l-1.8 1.8c-.2.2 0 .5.3.6l5.5 1.5 1.5 5.5c.1.3.4.5.6.3l1.8-1.8c.2-.2.3-.5.2-.8l-1-4 3.5-3.5 3.5 7.5c.2.2.5.2.7 0l1.8-1.8c.3-.2.6-.6.5-1.1z" />
                </svg>
              </div>

              {/* Train Logo */}
              <div className="character char-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="16" rx="2" />
                  <path d="M4 11h16" />
                  <path d="M12 3v8" />
                  <path d="M8 19l-2 3" />
                  <path d="M16 19l2 3" />
                  <circle cx="8" cy="15" r="1.5" fill="white" />
                  <circle cx="16" cy="15" r="1.5" fill="white" />
                </svg>
              </div>

              {/* Bus Logo */}
              <div className="character char-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M2 12h20" />
                  <path d="M6 18v2" />
                  <path d="M18 18v2" />
                  <circle cx="8" cy="14" r="1.5" fill="white" />
                  <circle cx="16" cy="14" r="1.5" fill="white" />
                  <path d="M8 10h0" />
                  <path d="M16 10h0" />
                </svg>
              </div>

              {/* Map Pin Logo */}
              <div className="character char-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side - Minimalistic Login */}
          <div
            className="split-right"
            style={{
              clipPath: rightClip,
              WebkitClipPath: rightClip,
              filter: isLoggingIn && phase === 2 ? 'drop-shadow(-15px 0 25px rgba(0,0,0,0.8))' : 'none',
              transition: 'none'
            }}
          >
            <div className="auth-wrapper">
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">Please enter your details to sign in.</p>

              <button className="google-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Log in with Google
              </button>

              <div className="divider">or</div>

              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="••••••••" />
                </div>

                <button type="submit" className="submit-btn">
                  Sign In
                </button>
              </form>

              <p className="signup-prompt">
                Don't have an account? <a href="#">Sign up</a>
              </p>
            </div>
          </div>

          {/* --- ZIPPER OVERLAYS --- */}
          {isLoggingIn && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'none' }}>

              {/* Seam Line */}
              {seamHeight > 0 && seamHeight > seamTop && (
                <div style={{
                  position: 'absolute',
                  top: `${seamTop}vh`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '2px',
                  height: `${seamHeight - seamTop}vh`,
                  backgroundColor: '#60a5fa',
                  boxShadow: '0 0 10px #60a5fa, 0 0 20px #3b82f6'
                }} />
              )}

              {/* Zipper Teeth */}
              {teeth.map(t => (
                <React.Fragment key={t.id}>
                  {/* Left Tooth */}
                  <div style={{
                    position: 'absolute',
                    top: `${t.toothY}vh`,
                    right: '50%',
                    width: '20px',
                    height: '10px',
                    backgroundColor: '#cbd5e1',
                    border: '1px solid #94a3b8',
                    borderRight: 'none',
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                    transformOrigin: 'right center',
                    transform: `translateX(${-t.outTranslateX}px) scale(${t.scale}) rotate(${-t.outRotate}deg)`,
                    opacity: t.opacity,
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)'
                  }} />
                  {/* Right Tooth */}
                  <div style={{
                    position: 'absolute',
                    top: `calc(${t.toothY}vh + 5px)`,
                    left: '50%',
                    width: '20px',
                    height: '10px',
                    backgroundColor: '#94a3b8',
                    border: '1px solid #64748b',
                    borderLeft: 'none',
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                    transformOrigin: 'left center',
                    transform: `translateX(${t.outTranslateX}px) scale(${t.scale}) rotate(${t.outRotate}deg)`,
                    opacity: t.opacity,
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)'
                  }} />
                </React.Fragment>
              ))}

              {/* V-Shape Bevel Highlights (SVG) */}
              {phase === 2 && (
                <svg style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh' }}>
                  <path d={leftBevelPath} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
                  <path d={rightBevelPath} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
                </svg>
              )}

              {/* Zipper Pull (Airplane) */}
              <div
                className="zipper-plane"
                style={{
                  top: `${displayPlaneY}vh`,
                  opacity: planeOpacity,
                  transform: `translateX(-50%) translateY(-50%) scale(${planeScale})`,
                  filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.5))'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}>
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.8 1.8c-.2.2-.2.5 0 .7l7.5 3.5-3.5 3.5-4-1c-.3-.1-.6 0-.8.2l-1.8 1.8c-.2.2 0 .5.3.6l5.5 1.5 1.5 5.5c.1.3.4.5.6.3l1.8-1.8c.2-.2.3-.5.2-.8l-1-4 3.5-3.5 3.5 7.5c.2.2.5.2.7 0l1.8-1.8c.3-.2.6-.6.5-1.1z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
