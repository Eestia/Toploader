'use client';
import { usePanier } from '../context/PanierContext';
import { useEffect, useState } from 'react';
import styles from './panier.module.css';
import Image from 'next/image';

export default function Panier() {
  const {
    panier,
    argent,
    inventaire,
    confirmerAchat
  } = usePanier();

  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) nav.style.backgroundColor = 'rgb(255, 232, 219)';
    return () => {
      if (nav) nav.style.backgroundColor = '';
    };
  }, []);

  // Calcule le prix total réel avec promo de chaque carte
  const prixPanierAvecPromos = panier.map(item => {
    const prix = Number(item.price);
    return isNaN(prix) ? 0 : prix;
  });

  // Calcule la promo "5e carte offerte" sur les PRIX réduits
  const sortedPrix = [...prixPanierAvecPromos].sort((a, b) => a - b);
  const prixMinimum = panier.length >= 5 ? sortedPrix[0] : 0;
  const total = prixPanierAvecPromos.reduce((acc, val) => acc + val, 0) - prixMinimum;

  const acheterTout = () => {
    if (argent < total) return;
    confirmerAchat();
    setConfirmation(true);
  };

  const handleBuy = () => {
    if (panier.length > 0) {
      acheterTout();
      setConfirmation(true);
    }
  };

  return (
    <section className={styles.sectionpanier}>
      <Image
        src="/images/fond2-pokemart.png"
        className={styles.bgpanier}
        alt="bg-panier"
        width={200}
        height={200}
      />
      <div className={styles.panier}>
        <div className={styles.lacaisse}>
          <div className={styles.vendeuseblabla}>
            <p>{confirmation ? "À bientôt !" : "Vous avez fait votre choix ?"}</p>
          </div>
          <Image
            src={confirmation ? "/images/caisse-smile.png" : "/images/caisse.png"}
            alt="vendeuse"
            width={200}
            height={200}
            className={styles.vendeusesmile}
          />
        </div>

        {!confirmation ? (
          <div className={styles.cartList}>
            {panier.length === 0 ? (
              <p className={styles.empty}>Le panier est vide.</p>
            ) : (
              <>
                {panier.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div>
                      <p><strong>{item.name}</strong></p>
                    </div>
                    <div>
                      {item.originalPrice && item.originalPrice > item.price ? (
                        <p>
                          <s>{item.originalPrice} ₽</s> {item.price} ₽ poképièces
                        </p>
                      ) : (
                        <p>{item.price} ₽ poképièces</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className={styles.total}>
                  <hr />
                  {prixMinimum > 0 && (
                    <p style={{ color: 'green' }}>
                      Promo : -{prixMinimum} ₽ (5e carte offerte)
                    </p>
                  )}
                  <p><strong>Total :</strong> {total.toFixed(2)} ₽ poképièces</p>
                  <button className={styles.buyBtn} onClick={handleBuy}>
                    Acheter
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={styles.confirmationMessage}>
            <p>
              Merci pour votre achat ! <br /><br /> vos objets sont dans votre inventaire.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
