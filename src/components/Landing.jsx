import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '🔐', title: 'Clerk Authentication', text: <>Drop-in sign up, sign in and user management powered by <code>Clerk</code>. No auth code to write.</> },
  { icon: '🗄️', title: 'Supabase Database', text: <>Postgres database with realtime superpowers via <code>Supabase</code>. CRUD helpers included.</> },
  { icon: '📊', title: 'Dashboard Included', text: 'A protected dashboard with stats and a working projects CRUD out of the box.' },
  { icon: '🎨', title: 'Modern Dark UI', text: 'Polished dark theme with reusable button, card and form styles.' },
  { icon: '🧪', title: 'Demo Mode', text: <>Runs with <code>mock auth</code> + <code>localStorage</code> when no API keys are set. Perfect for previews.</> },
  { icon: '💳', title: 'Billing Ready', text: 'Pricing section included — plug in Stripe or Lemon Squeezy when you are ready.' },
];

const PLANS = [
  { name: 'Starter', price: '$0', per: '/ forever', features: ['Up to 3 projects', 'Community support', 'Demo mode'], cta: 'Start free', featured: false },
  { name: 'Pro', price: '$19', per: '/ month', features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom domain'], cta: 'Go Pro', featured: true },
  { name: 'Team', price: '$49', per: '/ month', features: ['Everything in Pro', '5 team seats', 'SSO & audit logs'], cta: 'Contact us', featured: false },
];

export function Landing() {
  return (
    <>
      <header className="hero container">
        <div className="badge"><span className="dot" /> v1.0 — React + Clerk + Supabase</div>
        <h1>
          Ship your SaaS <span className="grad">10x faster</span>
        </h1>
        <p>
          A production-ready starter kit with authentication, database and dashboard
          already wired up. Clone it, add your API keys, and focus on your product.
        </p>
        <div className="hero-cta">
          <Link to="/signup" className="btn btn-primary">Get started free</Link>
          <Link to="/dashboard" className="btn btn-ghost">Live demo</Link>
        </div>
      </header>

      <section className="section container" id="features">
        <h2 className="section-title">Everything you need to launch</h2>
        <p className="section-sub">Batteries included. Delete what you don't need.</p>
        <div className="grid-3">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">From clone to production in minutes</h2>
        <p className="section-sub">Three steps. That's it.</p>
        <div className="steps">
          <div className="step">
            <h3>Clone & install</h3>
            <p><code>git clone</code> the repo and run <code>npm install</code>.</p>
          </div>
          <div className="step">
            <h3>Add your keys</h3>
            <p>Copy <code>.env.example</code> to <code>.env</code> and paste your Clerk + Supabase keys.</p>
          </div>
          <div className="step">
            <h3>Ship it</h3>
            <p><code>npm run build</code> and deploy to Vercel. Done.</p>
          </div>
        </div>
      </section>

      <section className="section container" id="pricing">
        <h2 className="section-title">Simple pricing</h2>
        <p className="section-sub">Start free. Upgrade when you grow.</p>
        <div className="pricing">
          {PLANS.map((p) => (
            <div className={`card price-card ${p.featured ? 'featured' : ''}`} key={p.name}>
              <h3>{p.name}</h3>
              <div className="price">{p.price}<small>{p.per}</small></div>
              <ul className="check-list">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Link to="/signup" className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="logo" style={{ fontSize: '1rem' }}>SaaS<span>kit</span></span>
          <span>Built with React, Clerk & Supabase. MIT licensed.</span>
        </div>
      </footer>
    </>
  );
}
