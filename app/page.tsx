'use client';

export default function Home() {
  return (
    <div className="split-container">
      {/* Left Side - Vibrant & Playful */}
      <div className="split-left">
        <div className="characters-container">
          {/* Blinking Character */}
          <div className="character char-1">
            <div className="eyes-container">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="smile"></div>
          </div>

          <div className="character char-2"></div>
          <div className="character char-3"></div>
          <div className="character char-4"></div>
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
