import React, { useEffect, useState } from 'react';
import { projectsApi, isDbDemo } from '../lib/db';
import { useAuth } from '../lib/auth';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setProjects(await projectsApi.list());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await projectsApi.create({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (p) => {
    try {
      await projectsApi.toggleStatus(p);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await projectsApi.remove(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const active = projects.filter((p) => p.status === 'active').length;
  const done = projects.filter((p) => p.status === 'done').length;
  const initials = (user?.fullName || 'U').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <div className="dash-head">
        <div className="user-chip">
          <span className="avatar">{user?.imageUrl ? <img src={user.imageUrl} alt="" style={{ width: '100%', borderRadius: '50%' }} /> : initials}</span>
          <div>
            <h1>Hey, {user?.fullName?.split(' ')[0] || 'there'} 👋</h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button>
      </div>

      {isDbDemo && (
        <div className="demo-note">
          🧪 <strong>Demo data</strong> — projects are stored in your browser. Connect Supabase to persist them in Postgres.
        </div>
      )}
      {error && <div className="demo-note" style={{ borderColor: 'rgba(248,113,113,.4)' }}>⚠️ {error}</div>}

      <div className="stats">
        <div className="card stat"><div className="num">{projects.length}</div><div className="lbl">Total projects</div></div>
        <div className="card stat"><div className="num" style={{ color: 'var(--green)' }}>{active}</div><div className="lbl">Active</div></div>
        <div className="card stat"><div className="num" style={{ color: 'var(--violet2)' }}>{done}</div><div className="lbl">Completed</div></div>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <input className="input" placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="input wide" placeholder="Short description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="btn btn-primary" type="submit">+ Add project</button>
      </form>

      {loading ? (
        <div className="empty">Loading projects…</div>
      ) : projects.length === 0 ? (
        <div className="empty">No projects yet. Add your first one above 👆</div>
      ) : (
        <div className="proj-list">
          {projects.map((p) => (
            <div className={`proj ${p.status === 'done' ? 'done' : ''}`} key={p.id}>
              <div className="proj-info">
                <h4>{p.title}</h4>
                {p.description && <p>{p.description}</p>}
              </div>
              <span className={`status-pill ${p.status}`}>{p.status}</span>
              <div className="proj-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => handleToggle(p)}>
                  {p.status === 'done' ? 'Reopen' : 'Complete'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
