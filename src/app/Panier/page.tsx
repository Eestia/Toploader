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


  const total = panier.reduce((acc, item) => acc + item.price, 0);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) nav.style.backgroundColor = 'rgb(255, 232, 219)';
    return () => {
      if (nav) nav.style.backgroundColor = '';
    };
  }, []);

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
                      <p>{item.price} ₽ poképièces</p>
                    </div>
                  </div>
                ))}

                <div className={styles.total}>
                  <hr />
                  <p><strong>Total :</strong> {total} ₽ poképièces</p>
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
              Merci pour votre achat ! <br /> <br /> vos objets sont dans votre inventaire.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
