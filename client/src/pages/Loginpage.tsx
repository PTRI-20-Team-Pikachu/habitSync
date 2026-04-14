import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/dashboard');
  }

  return (
    <section>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p style={{ textAlign: 'center' }}>
        No account yet? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}