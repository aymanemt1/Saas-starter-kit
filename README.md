# SaaSkit — SaaS Starter Kit

Ship your SaaS 10x faster. React + Vite starter with **Clerk** authentication,
**Supabase** database, protected dashboard and a working projects CRUD — out of the box.

## ✨ What's inside

- 🔐 **Clerk auth** — sign up, sign in, user management (drop-in components)
- 🗄️ **Supabase** — Postgres database + CRUD helpers (`src/lib/db.js`)
- 📊 **Dashboard** — protected route with stats + projects CRUD
- 🎨 **Modern dark UI** — reusable styles, responsive
- 🧪 **Demo mode** — works with zero API keys (mock auth + localStorage)

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 — it runs in **demo mode**: click "Continue as Demo User".

## 🔑 Going live

1. Copy `.env.example` → `.env`
2. **Clerk**: create an app at [dashboard.clerk.com](https://dashboard.clerk.com) → paste the **Publishable key** as `VITE_CLERK_PUBLISHABLE_KEY`
3. **Supabase**: create a project at [supabase.com](https://supabase.com) → paste **Project URL** + **anon public key**, then run this SQL in the SQL editor:

```sql
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text default 'active',
  created_at timestamptz default now()
);
alter table projects enable row level security;
create policy "public all" on projects for all using (true) with check (true);
```

> For production, replace the open RLS policy with per-user policies using `auth.uid()`.

4. Restart the dev server — real auth + real database. 🎉

## 📁 Structure

```
src/
├── lib/
│   ├── auth.jsx   # Clerk + demo-mode auth (unified useAuth hook)
│   └── db.js      # Supabase + localStorage fallback (projects CRUD)
├── components/
│   ├── Navbar.jsx
│   ├── Landing.jsx   # hero, features, steps, pricing, footer
│   └── RouteGuards.jsx
├── pages/
│   ├── AuthPages.jsx # login / signup (Clerk or demo)
│   └── Dashboard.jsx # protected dashboard + CRUD
├── App.jsx           # routing
└── index.css         # theme
```

## 🧩 Ideas to extend

- Stripe / Lemon Squeezy billing on the Pricing section
- Team workspaces (Supabase RLS per organization)
- Email notifications (Supabase Edge Functions / Resend)

MIT licensed. Built by [Aymane Moutoute](https://github.com/aymanemt1).
