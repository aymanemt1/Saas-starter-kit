import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isDbDemo = !URL || !ANON;

const supabase = isDbDemo ? null : createClient(URL, ANON);

const LS_KEY = 'saaskit-demo-projects';

function readLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  const seed = [
    { id: 'demo-1', title: 'Launch landing page', description: 'Ship the marketing site', status: 'done', created_at: new Date().toISOString() },
    { id: 'demo-2', title: 'Connect Stripe', description: 'Add billing to the SaaS', status: 'active', created_at: new Date().toISOString() },
  ];
  localStorage.setItem(LS_KEY, JSON.stringify(seed));
  return seed;
}

function writeLocal(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export const projectsApi = {
  async list() {
    if (isDbDemo) return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async create({ title, description }) {
    if (isDbDemo) {
      const items = readLocal();
      const item = { id: 'demo-' + Date.now(), title, description, status: 'active', created_at: new Date().toISOString() };
      writeLocal([item, ...items]);
      return item;
    }
    const { data, error } = await supabase
      .from('projects')
      .insert({ title, description, status: 'active' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async toggleStatus(item) {
    const next = item.status === 'done' ? 'active' : 'done';
    if (isDbDemo) {
      const items = readLocal().map((p) => (p.id === item.id ? { ...p, status: next } : p));
      writeLocal(items);
      return { ...item, status: next };
    }
    const { data, error } = await supabase.from('projects').update({ status: next }).eq('id', item.id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    if (isDbDemo) {
      writeLocal(readLocal().filter((p) => p.id !== id));
      return;
    }
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },
};

// SQL to create the table in Supabase (paste in the SQL editor):
export const PROJECTS_TABLE_SQL = `
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text default 'active',
  created_at timestamptz default now()
);
alter table projects enable row level security;
create policy "public all" on projects for all using (true) with check (true);
`;
