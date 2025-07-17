'use client';
import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Vous avez bien été inscrit(e) à la newsletter !");
  };

  return (
    <footer className={styles.footer}>
      <section className={styles.footerpart1}>
        <div>
          {/* Liens principaux */}
          <nav className={styles.links}>
            <a href="/">Accueil</a>
            <a href="/shop">Shop</a>
            <a href="/inventaire">Inventaire</a>
            <a href="/panier">Panier</a>
            <a href="https://www.pokemon.com/us/legal/information">Mentions légales</a>
          </nav>
        </div>
        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h2>Inscris-toi à notre newsletter pour recevoir des réductions exclusives !</h2>
          <form onSubmit={handleNewsletterSubmit} className={styles.form}>
            <input type="email" placeholder="Ton email" required />
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </section>
      <hr className={styles.barre} />
      <section className={styles.footer2}>
        {/* Réseaux sociaux */}
        <div className={styles.social}>
          <a href="https://www.tiktok.com/@_esthia_?lang=fr" target="_blank" rel="noopener noreferrer">
            <img src="/images/tiktok.png" alt="Twitter" width={32} height={32} />
          </a>
          <a href="https://www.instagram.com/_eesthia_/?hl=fr" target="_blank" rel="noopener noreferrer">
            <img src="/images/insta.png" alt="Instagram" width={32} height={32} />
          </a>
          <a href="https://github.com/Eestia" target="_blank" rel="noopener noreferrer">
            <img src="/images/github.png" alt="GitHub" width={32} height={32} />
          </a>
        </div>
        {/* Mentions & nom */}
        <p className={styles.credits}>
          &copy; {new Date().getFullYear()} PokéShop – Tous droits réservés •{' '}
          <a href="https://eestia.github.io/portofio/" target="_blank" rel="noopener noreferrer">
            Réalisé par Eestia
          </a>
        </p>
      </section>
    </footer>
  );
}

