'use client';
import { usePanier } from '../context/PanierContext';
import { useEffect, useState } from 'react';
import styles from './panier.module.css';
import Image from 'next/image';

export default function Panier() {
  const { panier } = usePanier();

  const total = panier.reduce((acc, item) => acc + item.price, 0);

  return (
    <section>
      <div className={styles.panier}>
        <div className={styles.vendeuseblabla}>
          <Image
            src="/images/vendeuse_smile.png"
            alt="vendeuse"
            width={200}
            height={200}
            className={styles.vendeusesmile}
          />
          <p>Vous avez fait votre choix ?</p>
        </div>

        <div className={styles.cartList}>
          {panier.length === 0 ? (
            <p className={styles.empty}>Le panier est vide.</p>
          ) : (
            <>
              {panier.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Image src={item.image} alt={item.name.fr} width={100} height={100} />
                  <div className={styles.cartItemInfo}>
                    <p><strong>{item.name.fr}</strong></p>
                    <p>{item.price} poképièces</p>
                  </div>
                </div>
              ))}

              <div className={styles.total}>
                <p><strong>Total :</strong> {total} poképièces</p>
                <button className={styles.buyBtn}>Acheter</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
