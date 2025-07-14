'use client';
import { useEffect, useState } from 'react';
import CartePokemon from '../../components/CartePokemon/CartePokemon';
import { usePanier } from '../context/PanierContext';

type PokemonData = {
  id: number;
  name: string;
  apiTypes: { name: string }[];
  stats: { attack: number };
  image: string;
};

export default function Inventaire() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const { inventaire } = usePanier(); // <-- CORRECTION ICI

  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/pokemon')
      .then(res => res.json())
      .then(data => setPokemons(data));
  }, []);

  // Filtrer uniquement les Pokémon qui sont dans l'inventaire
  const pokemonsDansInventaire = pokemons.filter(p =>
    inventaire.some(item => item.id === p.id)
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mon Inventaire</h1>
      {pokemonsDansInventaire.length === 0 ? (
        <p>Votre inventaire est vide.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {pokemonsDansInventaire.map(pokemon => (
            <CartePokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
