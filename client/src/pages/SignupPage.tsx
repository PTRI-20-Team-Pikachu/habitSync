import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

export default function SignupPage() {
  const navigate = useNavigate();

  function handleSignup() {
    navigate('/dashboard');
  }

  return (
    <section>
      <AuthForm mode="signup" onSubmit={handleSignup} />
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </section>
  );
}