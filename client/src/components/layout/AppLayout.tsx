import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useTheme } from '../../hooks/use-theme';

export default function AppLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100svh', background: 'var(--px-bg)' }}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
        <Outlet />
      </main>
    </div>
  );
}
