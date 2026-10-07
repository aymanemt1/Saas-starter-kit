import React, { createContext, useContext, useState } from 'react';
import {
  ClerkProvider,
  useUser as useClerkUser,
  useClerk,
  SignIn as ClerkSignIn,
  SignUp as ClerkSignUp,
} from '@clerk/clerk-react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export const isAuthDemo = !CLERK_KEY;

const UnifiedCtx = createContext(null);
export function useAuth() {
  return useContext(UnifiedCtx);
}

// ---------- Clerk bridge ----------
function ClerkBridge({ children }) {
  const { user, isSignedIn } = useClerkUser();
  const clerk = useClerk();
  const value = {
    user: user
      ? {
          fullName: user.fullName || user.username || 'User',
          email: user.primaryEmailAddress?.emailAddress || '',
          imageUrl: user.imageUrl || '',
        }
      : null,
    isSignedIn: !!isSignedIn,
    signOut: () => clerk.signOut(),
    signInDemo: null,
    isDemo: false,
  };
  return <UnifiedCtx.Provider value={value}>{children}</UnifiedCtx.Provider>;
}

// ---------- Demo (no-key) bridge ----------
function DemoBridge({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('saaskit-demo-user') || 'null');
    } catch {
      return null;
    }
  });
  const signInDemo = () => {
    const u = { fullName: 'Demo User', email: 'demo@saaskit.dev', imageUrl: '' };
    localStorage.setItem('saaskit-demo-user', JSON.stringify(u));
    setUser(u);
  };
  const signOut = () => {
    localStorage.removeItem('saaskit-demo-user');
    setUser(null);
  };
  const value = { user, isSignedIn: !!user, signInDemo, signOut, isDemo: true };
  return <UnifiedCtx.Provider value={value}>{children}</UnifiedCtx.Provider>;
}

export function AuthProvider({ children }) {
  if (isAuthDemo) return <DemoBridge>{children}</DemoBridge>;
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <ClerkBridge>{children}</ClerkBridge>
    </ClerkProvider>
  );
}

export function SignInBox() {
  if (isAuthDemo) return null;
  return <ClerkSignIn afterSignInUrl="/dashboard" />;
}

export function SignUpBox() {
  if (isAuthDemo) return null;
  return <ClerkSignUp afterSignUpUrl="/dashboard" />;
}
