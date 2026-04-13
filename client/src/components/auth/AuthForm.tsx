import { FormEvent, useState } from 'react';

type AuthMode = 'login' | 'signup';

type AuthFormProps = {
  mode: AuthMode;
  onSubmit?: (data: { email: string; password: string; username?: string }) => void;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignup = mode === 'signup';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      email: email.trim(),
      password: password.trim(),
      ...(isSignup ? { username: username.trim() } : {}),
    };

    onSubmit?.(payload);
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h1>{isSignup ? 'Create Account' : 'Login'}</h1>

      {isSignup && (
        <label style={formStyles.label}>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
            style={formStyles.input}
          />
        </label>
      )}

      <label style={formStyles.label}>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
          style={formStyles.input}
        />
      </label>

      <label style={formStyles.label}>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          style={formStyles.input}
        />
      </label>

      <button type="submit" style={formStyles.button}>
        {isSignup ? 'Sign Up' : 'Login'}
      </button>
    </form>
  );
}

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    maxWidth: '360px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid black',
  },
  label: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 14px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};