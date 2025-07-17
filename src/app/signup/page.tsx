'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import './signup.css'

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu pourrais stocker le compte dans une BDD
   login({ email, pseudo, password });
   router.push('/profil');
  };

  return (
    <div id='signup'>
    <Image src="/images/pokebox.png" alt="pokebox" width={1500} height={800} id='pokebox1'/>
      <form onSubmit={handleSignup}>
        <label>
          Pseudo :
          <input
            type="text"
            required
            value={pseudo}
            onChange={e => setPseudo(e.target.value)}
          />
        </label>
        <br />
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
        <button type="submit">Créer mon compte</button>
      </form>
    </div>
  );
}
