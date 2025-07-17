'use client';
import { useEffect, useState } from 'react';
import CartePokemon from '../../components/CartePokemon/CartePokemon';
import { usePanier } from '../context/PanierContext';
import styles from './inventaire.module.css';

type PokemonData = {
  id: number;
  name: string;
  apiTypes: { name: string }[];
  stats: { attack: number };
  image: string;
};

export default function Inventaire() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(true); // nouvel état loading
  const { inventaire } = usePanier();

  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/pokemon')
      .then(res => res.json())
      .then(data => {
        setPokemons(data);
        setIsLoading(false); // chargement terminé
      });
  }, []);

  const pokemonsDansInventaire = pokemons.filter(p =>
    inventaire.some(item => String(item.id) === String(p.id))
  );

  return (
    <div
      style={{
        padding: '2rem',
        backgroundImage: "url('/images/bg-inventaire.jpg')",
        backgroundRepeat: 'repeat',
        width: '100vw',
        minHeight: '100vh',
        backgroundSize: 'auto',
        fontFamily: "var(--font-vt), monospace",
      }}
    >
      <h1>Mon Inventaire</h1>

      {isLoading ? (
        <div className={styles.placeholder}>
          <img
            src="/images/placeholder.png"
            alt="placeholder"
            className={styles.placeholderImage}
          />
          <p>Tu cherches tes cartes...</p>
        </div>
      ) : pokemonsDansInventaire.length === 0 ? (
        <p className={styles.txtp}>Oh...tu n'as aucune carte.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {pokemonsDansInventaire.map(pokemon => (
            <CartePokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
