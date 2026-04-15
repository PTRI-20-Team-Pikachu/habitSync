import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { getSession } from '../features/auth/auth.api';

const FEATURES = [
  { icon: '⚔', label: 'Track daily & weekly quests' },
  { icon: '🐾', label: 'Raise your pixel pet companion' },
  { icon: '✨', label: 'Earn XP and level up' },
  { icon: '🏆', label: 'Unlock badges and achievements' },
];

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkExistingSession() {
      try {
        await getSession();
        navigate('/dashboard');
      } catch {
        // No active session, stay on login page.
      }
    }

    void checkExistingSession();
  }, [navigate]);

  function handleLogin() {
    navigate('/dashboard');
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: 40,
        minHeight: 'calc(100svh - 64px)',
        alignItems: 'center',
      }}
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          paddingRight: 20,
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1
            className="font-pixel"
            style={{
              fontSize: 28,
              color: 'var(--px-primary)',
              lineHeight: 1.5,
              textShadow: '4px 4px 0 var(--px-shadow)',
            }}
          >
            HABIT
            <span style={{ color: 'var(--px-gold)' }}>SYNC</span>
          </h1>
          <p
            className="font-pixel"
            style={{
              fontSize: 10,
              color: 'var(--px-text-muted)',
              lineHeight: 2,
            }}
          >
            Level up your daily life.
            <br />
            One habit at a time.
          </p>
        </div>

        {/* Pixel pet hero */}
        <div
          className="px-border"
          style={{
            background: 'var(--px-panel)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 8,
              left: 12,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: 'var(--px-text-muted)',
            }}
          >
            ★ PET COMPANION ★
          </span>

          <div
            style={{
              fontSize: 96,
              lineHeight: 1,
              filter: 'drop-shadow(4px 4px 0 rgba(0,0,0,0.4))',
              marginTop: 16,
            }}
          >
            🐶
          </div>

          <div
            className="font-pixel"
            style={{
              fontSize: 8,
              color: 'var(--px-gold)',
              textAlign: 'center',
              lineHeight: 2,
            }}
          >
            TINY PUP
          </div>

          <div style={{ width: '100%', maxWidth: 200 }}>
            <div
              className="font-pixel"
              style={{
                fontSize: 7,
                color: 'var(--px-text-muted)',
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>XP</span>
              <span style={{ color: 'var(--px-gold)' }}>0 / 100</span>
            </div>
            <div className="px-xp-bar-track">
              <div className="px-xp-bar-fill" style={{ width: '0%' }} />
            </div>
          </div>
        </div>

        {/* Features list */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FEATURES.map(({ icon, label }) => (
            <li
              key={label}
              className="font-pixel"
              style={{
                fontSize: 8,
                color: 'var(--px-text)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                lineHeight: 2,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  border: '2px solid var(--px-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 14,
                }}
              >
                {icon}
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Auth card ────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <p
          className="font-pixel"
          style={{ fontSize: 8, textAlign: 'center', color: 'var(--px-text-muted)', lineHeight: 2 }}
        >
          No account?{' '}
          <Link
            to="/signup"
            style={{ color: 'var(--px-primary)', textDecoration: 'none' }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
