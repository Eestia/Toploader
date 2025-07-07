'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './carousel.module.css';

const slides = [
  {
    src: '/images/slide1.jpg',
    title: 'Pokémon Scarlet and Violet',
    description: 'Catch the latest generation of Pokémon and start your new adventure!',
  },
  {
    src: '/images/slide2.jpg',
    title: 'Koraidon and Miraidon',
    description: 'Discover the legendary cards of the most powerful Pokémon!',
  },
  {
    src: '/images/slide3.jpg',
    title: 'Zacian and Zamazenta',
    description: ' Collect the rarest and most powerful cards in the game!',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 5000ms = 4 secondes

    return () => clearInterval(interval); // Nettoyage
  }, [current]); // <- Tu peux aussi mettre [] pour que ça ne reset pas à chaque fois

  return (
    <div className={styles.carousel}>
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === current ? styles.active : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            className={styles.image}
          />
          <div className={styles.caption}>
            <h2 className={styles.pixelFont}>{slide.title}</h2>
            <p className={styles.pixelFont}>{slide.description}</p>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className={styles.prev}>‹</button>
      <button onClick={nextSlide} className={styles.next}>›</button>
    </div>
  );
}
