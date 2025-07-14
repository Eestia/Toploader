// components/CartePokemon.tsx
import Image from 'next/image';
import styles from './CartePokemon.module.css';

type PokemonData = {
  id: number;
  name: string;
  apiTypes: { name: string }[];
  stats: { attack: number };
  image: string;
};

function translateTypeToFrench(type: string) {
  const map: { [key: string]: string } = {
    normal: 'normal',
    fire: 'feu',
    water: 'eau',
    electric: 'electrik',
    grass: 'plante',
    ice: 'glace',
    fighting: 'combat',
    poison: 'poison',
    ground: 'sol',
    flying: 'vol',
    psychic: 'psy',
    bug: 'insecte',
    rock: 'roche',
    ghost: 'spectre',
    dragon: 'dragon',
    dark: 'tenebres',
    steel: 'acier',
    fairy: 'fee',
  };
  return (map[type.toLowerCase()] || type.toLowerCase())
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
export default function CartePokemon({
  pokemon,
  ajouterAuPanier
}: {
  pokemon: PokemonData;
  ajouterAuPanier: (pokemon: PokemonData) => void;
}) {
  const type = pokemon.apiTypes[0]?.name ?? 'normal';
  const translatedType = translateTypeToFrench(type);

  const bgColors: { [key: string]: string } = {
    normal: '#A8A878', feu: '#F08030', eau: '#6890F0', electrik: '#F8D030',
    plante: '#78C850', glace: '#98D8D8', combat: '#C03028', poison: '#A040A0',
    sol: '#E0C068', vol: '#A890F0', psy: '#F85888', insecte: '#A8B820',
    roche: '#B8A038', spectre: '#705898', dragon: '#7038F8',
    tenebres: '#705848', acier: '#B8B8D0', fee: '#EE99AC'
  };

  const handleAdd = () => {
    ajouterAuPanier(pokemon);
  };

  return (
    <div className={styles.carte}>
      <h3 className={styles.pokecardtxt1}>{pokemon.name}</h3>
      <p className={styles.pokecardtxt2}>{pokemon.apiTypes.map(t => t.name).join(' / ')}</p>
      <p className={styles.pokecardtxt3}>{pokemon.stats.attack} ATK</p>
      <Image src={`/images/carte/${translatedType}.png`} alt="fond" width={200} height={300} className={styles.pokecard}/>
      <div className={styles.bglacarte} style={{ backgroundColor: bgColors[translatedType] || '#444' }}></div>
      <Image src={pokemon.image} alt={pokemon.name} width={100} height={100} className={styles.pkmnimg} />
      <button className={styles.addButton} onClick={handleAdd}>
        Ajouter au panier
      </button>
    </div>
  );
}
