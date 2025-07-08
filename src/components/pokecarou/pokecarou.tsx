"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './pokecarou.module.css';

type Pokemon = {
  id: number;
  name: string;
  sprite: string;
};

const PokemonCarousel: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch('https://pokebuildapi.fr/api/v1/pokemon/');
        const data: Pokemon[] = await res.json();
        const selected = data.slice(0, 20);
        setPokemons([...selected, ...selected]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;
    const speed = 1;

    function animate() {
      if (!carousel) return;
      posRef.current -= speed;
      const totalWidth = carousel.scrollWidth / 2;

      if (Math.abs(posRef.current) >= totalWidth) {
        posRef.current = 0;
      }

      carousel.style.transform = `translateX(${posRef.current}px)`;
      animationFrameId.current = requestAnimationFrame(animate);
    }

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [pokemons]);

  return (
    <div className={styles['carousel-container']}>
      <div ref={carouselRef} className={styles.carousel}>
        {pokemons.map((poke, idx) => (
          <div key={idx} className={styles['pokemon-circle']} title={poke.name}>
            <img src={poke.sprite} alt={poke.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCarousel;
