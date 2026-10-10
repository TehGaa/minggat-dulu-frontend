'use client';

export default function Home() {
  return (
    <div className="split-container">
      {/* Left Side - Vibrant & Playful */}
      <div className="split-left">
        <div className="characters-container">
          {/* Airplane Logo */}
          <div className="character char-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.8 1.8c-.2.2-.2.5 0 .7l7.5 3.5-3.5 3.5-4-1c-.3-.1-.6 0-.8.2l-1.8 1.8c-.2.2 0 .5.3.6l5.5 1.5 1.5 5.5c.1.3.4.5.6.3l1.8-1.8c.2-.2.3-.5.2-.8l-1-4 3.5-3.5 3.5 7.5c.2.2.5.2.7 0l1.8-1.8c.3-.2.6-.6.5-1.1z"/>
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
      <div className="split-right">
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

          <form onSubmit={(e) => e.preventDefault()}>
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
    </div>
  );
}
