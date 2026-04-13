import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '10px', borderBottom: '1px solid black' }}>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}