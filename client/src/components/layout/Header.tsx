import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { to: '/dashboard', label: 'Quest' },
  { to: '/signup', label: 'Join' },
  { to: '/', label: 'Login' },
];

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const location = useLocation();

  return (
    <header
      className="font-pixel"
      style={{
        background: 'var(--px-panel)',
        borderBottom: '4px solid var(--px-border)',
        boxShadow: '0 4px 0 var(--px-shadow)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          height: 56,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: 'var(--px-primary)',
            textDecoration: 'none',
            fontSize: 11,
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          ⚔ HABIT<span style={{ color: 'var(--px-gold)' }}>SYNC</span>
        </Link>

        {/* XP bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 7, color: 'var(--px-text-muted)', whiteSpace: 'nowrap' }}>
            LVL 4
          </span>
          <div
            className="px-xp-bar-track"
            style={{ flex: 1, maxWidth: 200 }}
            title="640 / 1000 XP"
          >
            <div className="px-xp-bar-fill" style={{ width: '64%' }} />
          </div>
          <span style={{ fontSize: 7, color: 'var(--px-gold)', whiteSpace: 'nowrap' }}>
            640 XP
          </span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 8,
                textDecoration: 'none',
                color:
                  location.pathname === to
                    ? 'var(--px-primary)'
                    : 'var(--px-text-muted)',
                letterSpacing: '0.06em',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-btn px-btn-ghost"
            style={{ fontSize: 10, padding: '6px 10px', border: '2px solid var(--px-border)' }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
