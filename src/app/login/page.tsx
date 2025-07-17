'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './login.css';

export default function LoginPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirige vers le profil si connecté (optionnel)
  useEffect(() => {
    if (user) {
      // Tu peux rediriger automatiquement ou juste afficher le message
      // router.push('/profil'); // à activer si tu veux auto-rediriger
    }
  }, [user]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password, pseudo: '' }); // pseudo vide ici, à ajuster selon logique
    router.push('/profil');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (user) {
    return (
      <div id="login">
        <Image
          src="/images/pokebox.png"
          alt="pokebox"
          width={1500}
          height={800}
          id="pokebox2"
        />
        <div id='deco'>
          <h2>Oh... Vous voulez déjà nous quitter ?</h2>
          <button onClick={handleLogout} id='btnquit'>
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="login">
      <Image
        src="/images/pokebox.png"
        alt="pokebox"
        width={1500}
        height={800}
        id="pokebox2"
      />
      <form onSubmit={handleLogin}>
        <label>
          Email :
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Mot de passe :
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ?{' '}
        <a href="/signup" style={{ color: 'blue' }}>
          S'inscrire
        </a>
      </p>
    </div>
  );
}
