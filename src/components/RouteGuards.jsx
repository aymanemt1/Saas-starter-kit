import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (!auth) return null;
  if (!auth.isSignedIn) return <Navigate to="/login" replace />;
  return children;
}

export function PublicOnly({ children }) {
  const auth = useAuth();
  if (!auth) return null;
  if (auth.isSignedIn) return <Navigate to="/dashboard" replace />;
  return children;
}

export function AuthRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard', { replace: true });
  }, [navigate]);
  return null;
}
