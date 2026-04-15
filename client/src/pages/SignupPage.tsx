import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';

export default function SignupPage() {
  const navigate = useNavigate();

  function handleSignup() {
    navigate('/dashboard');
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100svh - 64px)',
        gap: 16,
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <p
          className="font-pixel"
          style={{ fontSize: 12, textAlign: 'center', color: 'var(--px-text-muted)', lineHeight: 2, marginTop: 16 }}
        >
          Have an account?{' '}
          <Link to="/" style={{ color: 'var(--px-primary)', textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
