'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './carousel.module.css';

const slides = [
  {
    src: '/images/slide1.jpg',
    title: 'Pokémon Scarlet et Violet',
    description: 'Attrape la dernière génération de Pokémon et commence ta nouvelle aventure !'
  },
  {
    src: '/images/slide2.jpg',
    title: 'Koraidon et Miraidon',
    description: 'Découvre les cartes légendaires des Pokémon les plus puissants !',
  },
  {
    src: '/images/slide3.jpg',
    title: 'Zacian et Zamazenta',
    description: 'Collectionne les cartes les plus rares et les plus puissantes du jeu !',
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className={styles.carousel}>
      {/* Slides */}
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

      {/* Contrôles : flèches + Pokéballs */}
      <div className={styles.controls}>
        <button onClick={prevSlide} className={styles.controlButton}>
          ‹
        </button>

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={styles.pokeballButton}
          >
            <Image
              src={index === current ? '/images/pokeball2.png' : '/images/pokeball.png'}
              alt={`Slide ${index + 1}`}
              width={40}
              height={40}
            />
          </button>
        ))}

        <button onClick={nextSlide} className={styles.controlButton}>
            ›
        </button>
      </div>
    </div>
  );
}
