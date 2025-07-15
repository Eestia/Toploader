'use client';
import styles from './Footer.module.css';

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <section className={styles.footerpart1}>
        <div>
            {/* Liens principaux */}
            <nav className={styles.links}>
            <a href="/">Accueil</a>
            <a href="/shop">Shop</a>
            <a href="/inventaire">Inventaire</a>
            <a href="/contact">Contact</a>
            <a href="/legal">Mentions légales</a>
            </nav>
        </div>
        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h2>Inscris-toi à notre newsletter pour recevoir des réductions exclusives !</h2>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <input type="email" placeholder="Ton email" required />
            <button type="submit">S'inscrire</button>
          </form>
        </div>

        </section>
        <hr className={styles.barre} />
        <section className={styles.footer2}>
        {/* Réseaux sociaux */}
            <div className={styles.social}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>

        {/* Mentions & nom */}
        <p className={styles.credits}>
          &copy; {new Date().getFullYear()} PokéShop – Tous droits réservés •{' '}
          <a href="https://tonportfolio.com" target="_blank" rel="noopener noreferrer">
            Réalisé par Eestia
          </a>
        </p>
        </section>
    </footer>
  );
}
