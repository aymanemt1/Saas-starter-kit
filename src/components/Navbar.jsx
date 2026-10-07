import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function Navbar() {
  const { isSignedIn, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          SaaS<span>kit</span>
        </Link>
        <div className="nav-links">
          <a href="/#features" className="hide-m">Features</a>
          <a href="/#pricing" className="hide-m">Pricing</a>
          {isSignedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Get started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
