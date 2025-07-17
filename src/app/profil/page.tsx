'use client';
import './profil.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    avatar: '',
    bio: '',
    preference: '',
    region: '',
  });

  const [gender, setGender] = useState<'boy' | 'girl'>('boy');

  // Redirige si non connecté
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      // Initialise avec données utilisateur + localStorage
      setFormData(prev => ({
        ...prev,
        pseudo: user.pseudo || '',
        email: user.email || '',
        password: user.password || '',
      }));

      const saved = localStorage.getItem('profilData');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
        if (parsed.gender === 'boy' || parsed.gender === 'girl') {
          setGender(parsed.gender);
        }
      }
    }
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profil enregistré !');
    localStorage.setItem(
      'profilData',
      JSON.stringify({ ...formData, gender })
    );
  };

  // N’affiche rien tant que l’utilisateur est inconnu (évite le bug des hooks)
  if (!user) return <p style={{ color: 'white', textAlign: 'center' }}>Chargement...</p>;

  const imageUrl =
    gender === 'boy' ? '/images/boy-sprite.webp' : '/images/girl-sprite.webp';

  return (
    <div id="profilbg">
      <Image
        src="/images/carte-dresseur.png"
        alt="profil"
        width={780}
        height={550}
        id="cartedresseur"
      />
      <div id="profil">
        <form onSubmit={handleSubmit} id="formprofil">
          <label id="label1">
            Pseudo :
            <input
              type="text"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              required
              placeholder="modifier"
            />
          </label>

          <label id="label2">
            Email :
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="modifier"
            />
          </label>

          <label id="label3">
            Mot de passe :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="modifier"
            />
          </label>

          <label id="label4">
            Type préféré :
            <input
              type="text"
              name="preference"
              value={formData.preference}
              onChange={handleChange}
              placeholder="modifier"
            />
          </label>

          <label id="label5">
            Région préféré :
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="modifier"
            />
          </label>

          <button id="btnenregistrer" type="submit">
            Enregistrer
          </button>

          <div id="imgsprite">
            <Image
              id="imgtrainer"
              src={imageUrl}
              alt={gender === 'boy' ? 'Garçon' : 'Fille'}
              width={100}
              height={100}
            />
            <div id="gender">
              <Image
                src="/images/male.png"
                alt="Choisir garçon"
                width={40}
                height={40}
                onClick={() => setGender('boy')}
                id="boy"
              />
              <Image
                src="/images/female.png"
                alt="Choisir fille"
                width={40}
                height={40}
                onClick={() => setGender('girl')}
                id="girl"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
