import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, isAuthDemo, SignInBox, SignUpBox } from '../lib/auth';
import { isDbDemo } from '../lib/db';

function DemoNotice() {
  if (!isAuthDemo && !isDbDemo) return null;
  return (
    <div className="demo-note">
      🧪 <strong>Demo mode</strong> — no API keys detected.
      {isAuthDemo && ' Auth is mocked (any click signs you in as Demo User).'}
      {isDbDemo && ' Data is stored in your browser (localStorage).'}
      <br />Add your keys to <code>.env</code> to go live — see README.
    </div>
  );
}

export function LoginPage() {
  const { signInDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    signInDemo();
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <DemoNotice />
        {isAuthDemo ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: 0 }}>Welcome back</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              Demo mode — click below to explore the dashboard.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleDemoLogin}>
              Continue as Demo User
            </button>
            <p style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
              New here? <Link to="/signup" style={{ color: 'var(--cyan)' }}>Create an account</Link>
            </p>
          </div>
        ) : (
          <SignInBox />
        )}
      </div>
    </div>
  );
}

export function SignupPage() {
  const { signInDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    signInDemo();
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <DemoNotice />
        {isAuthDemo ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: 0 }}>Create your account</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              Demo mode — click below to explore the dashboard.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleDemoLogin}>
              Continue as Demo User
            </button>
            <p style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--cyan)' }}>Sign in</Link>
            </p>
          </div>
        ) : (
          <SignUpBox />
        )}
      </div>
    </div>
  );
}
