import { useState } from 'react';
import type { FormEvent } from 'react';

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  mode: AuthMode;
  onSubmit?: (data: { email: string; password: string; username?: string }) => void;
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignup = mode === 'signup';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.({
      email: email.trim(),
      password: password.trim(),
      ...(isSignup ? { username: username.trim() } : {}),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="px-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--px-border)', paddingBottom: 16 }}>
        <h2
          className="font-pixel"
          style={{ fontSize: 17, color: 'var(--px-primary)', lineHeight: 1.8 }}
        >
          {isSignup ? '▶ JOIN QUEST' : '▶ LOGIN'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--px-text-muted)', marginTop: 6 }}>
          {isSignup
            ? 'Create your hero account'
            : 'Continue your adventure'}
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {isSignup && (
          <div>
            <label className="px-label" htmlFor="username" style={{ fontSize: 8 }}>USERNAME</label>
            <input
              id="username"
              type="text"
              className="px-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="HeroName123"
              required
            />
          </div>
        )}

        <div>
          <label className="px-label" htmlFor="email" style={{ fontSize: 11 }}>EMAIL</label>
          <input
            id="email"
            type="email"
            className="px-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hero@example.com"
            required
          />
        </div>

        <div>
          <label className="px-label" htmlFor="password" style={{ fontSize: 11 }}>PASSWORD</label>
          <input
            id="password"
            type="password"
            className="px-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <button type="submit" className="px-btn px-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        {isSignup ? '⚔ CREATE HERO' : '▶ START QUEST'}
      </button>
    </form>
  );
}
