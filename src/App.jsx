import { useEffect, useState } from 'react';
import { base44 } from './api/client.js';
import Login from './screens/Login.jsx';
import Home from './screens/Home.jsx';
import Brief from './screens/Brief.jsx';
import Result from './screens/Result.jsx';
import Chat from './screens/Chat.jsx';
import Settings from './screens/Settings.jsx';

const TABS = [
  { id: 'home', label: 'Plans' },
  { id: 'brief', label: 'New' },
  { id: 'chat', label: 'Agent' },
  { id: 'settings', label: 'Host' },
];

export default function App() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState('home');
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    let live = true;
    base44.auth
      .me()
      .then((u) => {
        if (live) setUser(u || null);
      })
      .catch(() => {
        if (live) setUser(null);
      });
    return () => {
      live = false;
    };
  }, []);

  if (user === undefined) {
    return (
      <div className="login">
        <div className="mark">
          Ad<span>Plan</span>
        </div>
        <p className="lead">Checking session…</p>
      </div>
    );
  }

  if (!user) {
    return <Login onAuthed={setUser} />;
  }

  const openPlan = (plan) => {
    setActivePlan(plan);
    setTab('result');
  };

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          Ad<span>Plan</span>
        </div>
        <div className="who">{user.email}</div>
      </header>

      {tab === 'home' && <Home onOpen={openPlan} onNew={() => setTab('brief')} />}
      {tab === 'brief' && (
        <Brief
          onDone={(plan) => {
            setActivePlan(plan);
            setTab('result');
          }}
        />
      )}
      {tab === 'result' && <Result plan={activePlan} onChange={setActivePlan} />}
      {tab === 'chat' && <Chat plan={activePlan} />}
      {tab === 'settings' && (
        <Settings
          user={user}
          onLogout={() => {
            try {
              base44.auth.logout('/');
            } catch {
              localStorage.clear();
              setUser(null);
            }
          }}
        />
      )}

      <nav className="nav">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
