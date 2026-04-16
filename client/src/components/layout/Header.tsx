import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  xp: number;
}

const NAV_LINKS = [
  { to: '/dashboard', label: 'Quest' },
  { to: '/signup', label: 'Join' },
  { to: '/', label: 'Login' },
];

export function Header({ theme, onToggleTheme, xp }: HeaderProps) {
  const location = useLocation();

  const XP_PER_LEVEL = 1000;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const progressPercent = Math.min((currentLevelXp / XP_PER_LEVEL) * 100, 100);

  return (
    <header className="top-hud font-pixel">
      <div className="hud-row">
        <div className="hud-left">
          <Link to="/" className="hud-brand" style={{ textDecoration: 'none' }}>
            <span>×</span>
            <span className="hud-logo">
              HABIT<span className="accent">SYNC</span>
            </span>
          </Link>

          <span className="hud-meta">LVL {level}</span>

          <div className="hud-bar-wrap">
            <div
              className="hud-bar"
              title={`${currentLevelXp} / ${XP_PER_LEVEL} XP`}
            >
              <div
                className="hud-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="hud-xp">{xp} XP</span>
          </div>
        </div>

        <div className="hud-right">
          <nav className="hud-links">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none',
                  color:
                    location.pathname === to
                      ? 'var(--cyan-dark)'
                      : 'var(--ink)',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={onToggleTheme}
            className="btn-small"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{ background: 'var(--paper)' }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>

      <div className="hud-bottom-line" />
    </header>
  );
}
