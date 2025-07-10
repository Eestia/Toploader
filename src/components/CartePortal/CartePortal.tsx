import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import './CartePortal.css';

type PokemonData = {
  id: number; // <-- ajoute l'id ici
  name: string;
  apiTypes: { name: string }[];
  stats: { attack: number };
  image: string;
};

type CartePortalProps = {
  pokemons: PokemonData[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
};

// Traduction du type Pokémon en français (nom d'image)
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
  const translated = (map[type.toLowerCase()] || type.toLowerCase())
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return translated;
}

export default function CartePortal({
  pokemons,
  currentIndex,
  onClose,
  onChangeIndex,
}: CartePortalProps) {
  if (
    !pokemons ||
    !Array.isArray(pokemons) ||
    pokemons.length === 0 ||
    currentIndex < 0 ||
    currentIndex >= pokemons.length ||
    !pokemons[currentIndex]?.apiTypes
  ) {
    return null;
  }

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  const [sameTypePokemons, setSameTypePokemons] = useState<PokemonData[] | null>(null);
  const [sameTypeIndex, setSameTypeIndex] = useState<number>(0);

  const currentPokemon = pokemons[currentIndex];
  const mainType = currentPokemon.apiTypes[0].name;

  // Synchronise l'index courant dans la liste filtrée à chaque changement de Pokémon courant
  useEffect(() => {
    if (!sameTypePokemons) return;
    const idx = sameTypePokemons.findIndex(p => p.id === currentPokemon.id);
    setSameTypeIndex(idx >= 0 ? idx : 0);
  }, [currentIndex, sameTypePokemons, currentPokemon.id]);

  // Charge la liste filtrée par type (avec id)
  const fetchSameTypePokemons = async () => {
    const res = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    const all = await res.json();
    const filtered = all.filter((p: any) => p.apiTypes[0].name === mainType);
    setSameTypePokemons(filtered);

    // Synchronise l'index dans la liste filtrée
    const idx = filtered.findIndex((p: any) => p.id === currentPokemon.id);
    setSameTypeIndex(idx >= 0 ? idx : 0);
  };

    // Charge la liste filtrée au premier affichage
  useEffect(() => {
    fetchSameTypePokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainType]);


const prev = () => {
  if (!sameTypePokemons || sameTypePokemons.length === 0) return;
  const newIndex = (sameTypeIndex - 1 + sameTypePokemons.length) % sameTypePokemons.length;
  const targetId = sameTypePokemons[newIndex].id;
  const idxInAll = pokemons.findIndex(p => p.id === targetId);
  if (idxInAll !== -1) {
    onChangeIndex(idxInAll);
  }
};

const next = () => {
  if (!sameTypePokemons || sameTypePokemons.length === 0) return;
  const newIndex = (sameTypeIndex + 1) % sameTypePokemons.length;
  const targetId = sameTypePokemons[newIndex].id;
  const idxInAll = pokemons.findIndex(p => p.id === targetId);
  if (idxInAll !== -1) {
    onChangeIndex(idxInAll);
  }
};

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('carte-overlay')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const imgType =
    currentPokemon.apiTypes.length > 0
      ? translateTypeToFrench(currentPokemon.apiTypes[0].name)
      : 'normal';

  return ReactDOM.createPortal(
    <div className="carte-overlay">
      <div
        className="carte-focus"
        style={{
          backgroundColor: {
            normal: '#A8A878',
            feu: '#F08030',
            eau: '#6890F0',
            electrik: '#F8D030',
            plante: '#78C850',
            glace: '#98D8D8',
            combat: '#C03028',
            poison: '#A040A0',
            sol: '#E0C068',
            vol: '#A890F0',
            psy: '#F85888',
            insecte: '#A8B820',
            roche: '#B8A038',
            spectre: '#705898',
            dragon: '#7038F8',
            tenebres: '#705848',
            acier: '#B8B8D0',
            fee: '#EE99AC',
          }[imgType] || '#444',
        }}
      >
        <button className="nav-btn left" onClick={prev}>←</button>
        <button className="nav-btn right" onClick={next}>→</button>

        <Image
          src={`/images/carte/${imgType}.png`}
          alt={`Carte ${imgType}`}
          width={500}
          height={700}
          className="carte"
        />
        <Image
          src={currentPokemon.image}
          alt={currentPokemon.name}
          width={300}
          height={300}
          className="pkmnimg"
        />
        <h1 id="nom">{currentPokemon.name}</h1>
        <h2 id="type">{currentPokemon.apiTypes.map(t => t.name).join(' / ')}</h2>
        <h2 id="atk">{currentPokemon.stats.attack} ATK</h2>
      </div>

      <style jsx>{`
        .carte-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .pkmnimg {
          margin-top: 240px;
        }
        .carte-focus {
          height: 110px;
          width: 85px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 2rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          z-index: 10000;
        }
        .nav-btn.left {
          left: -60px;
        }
        .nav-btn.right {
          right: -60px;
        }
        #nom, #type, #atk {
          margin: 6px 0;
        }
      `}</style>
    </div>,
    portalRoot
  );
}
