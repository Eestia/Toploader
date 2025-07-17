import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import './CartePortal.css';
import { usePanier } from '@/app/context/PanierContext';

// Ajout du cache de promotions
const promoCache: { [key: number]: number | null } = {};

type PokemonData = {
  id: number;
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

function translateTypeToFrench(type: string) {
  const map: { [key: string]: string } = {
    normal: 'normal', feu: 'feu', water: 'eau', electric: 'electrik', grass: 'plante',
    ice: 'glace', fighting: 'combat', poison: 'poison', ground: 'sol', flying: 'vol',
    psychic: 'psy', bug: 'insecte', rock: 'roche', ghost: 'spectre', dragon: 'dragon',
    dark: 'tenebres', steel: 'acier', fairy: 'fee',
  };
  const translated = (map[type.toLowerCase()] || type.toLowerCase())
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
  return translated;
}

function getPrixParType(type: string): number {
  const prixParType: { [key: string]: number } = {
    eau: 4, glace: 4, vol: 4, normal: 4,
    feu: 10, dragon: 10, roche: 10, electrik: 10,
    plante: 6, insecte: 6, poison: 6,
    psy: 8, spectre: 8, tenebres: 8,
    acier: 5, sol: 5, combat: 5, fee: 7,
  };
  const typeCle = translateTypeToFrench(type.toLowerCase());
  return prixParType[typeCle] ?? 4;
}

function getPromo(pokemonId: number): number | null {
  if (promoCache[pokemonId] !== undefined) return promoCache[pokemonId];
  const hasPromo = pokemonId % 5 === 0;
  if (!hasPromo) {
    promoCache[pokemonId] = null;
    return null;
  }
  const taux = Math.floor(Math.random() * 3 + 1) * 10;
  promoCache[pokemonId] = taux;
  return taux;
}

export default function CartePortal({
  pokemons,
  currentIndex,
  onClose,
  onChangeIndex,
}: CartePortalProps) {
  if (
    !pokemons || !Array.isArray(pokemons) || pokemons.length === 0 ||
    currentIndex < 0 || currentIndex >= pokemons.length ||
    !pokemons[currentIndex]?.apiTypes
  ) return null;

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  const [sameTypePokemons, setSameTypePokemons] = useState<PokemonData[] | null>(null);
  const [sameTypeIndex, setSameTypeIndex] = useState<number>(0);

  const currentPokemon = pokemons[currentIndex];
  const mainType = currentPokemon.apiTypes[0].name;
  const { ajouterAuPanier, panier } = usePanier();

  const isInCart = (id: number) => panier.some(p => p.id === id);

  const promo = getPromo(currentPokemon.id);
  const prixBase = getPrixParType(mainType);
  const prixFinal = promo ? (prixBase * (1 - promo / 100)).toFixed(2) : prixBase;

  const handleAddToCart = (pokemon: PokemonData) => {
    ajouterAuPanier({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      price: prixFinal,
    });
  };

  useEffect(() => {
    if (!sameTypePokemons) return;
    const idx = sameTypePokemons.findIndex(p => p.id === currentPokemon.id);
    setSameTypeIndex(idx >= 0 ? idx : 0);
  }, [currentIndex, sameTypePokemons, currentPokemon.id]);

  const fetchSameTypePokemons = async () => {
    const res = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    const all = await res.json();
    const filtered = all.filter((p: any) => p.apiTypes[0].name === mainType);
    setSameTypePokemons(filtered);
    const idx = filtered.findIndex((p: any) => p.id === currentPokemon.id);
    setSameTypeIndex(idx >= 0 ? idx : 0);
  };

  useEffect(() => {
    fetchSameTypePokemons();
  }, [mainType]);

  const prev = () => {
    if (!sameTypePokemons?.length) return;
    const newIndex = (sameTypeIndex - 1 + sameTypePokemons.length) % sameTypePokemons.length;
    const targetId = sameTypePokemons[newIndex].id;
    const idxInAll = pokemons.findIndex(p => p.id === targetId);
    if (idxInAll !== -1) onChangeIndex(idxInAll);
  };

  const next = () => {
    if (!sameTypePokemons?.length) return;
    const newIndex = (sameTypeIndex + 1) % sameTypePokemons.length;
    const targetId = sameTypePokemons[newIndex].id;
    const idxInAll = pokemons.findIndex(p => p.id === targetId);
    if (idxInAll !== -1) onChangeIndex(idxInAll);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('carte-overlay')) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const imgType = translateTypeToFrench(mainType);

  return ReactDOM.createPortal(
    <div className="carte-overlay">
      <div
        className="carte-focus"
        style={{
          backgroundColor: {
            normal: '#A8A878', feu: '#F08030', eau: '#6890F0', electrik: '#F8D030',
            plante: '#78C850', glace: '#98D8D8', combat: '#C03028', poison: '#A040A0',
            sol: '#E0C068', vol: '#A890F0', psy: '#F85888', insecte: '#A8B820',
            roche: '#B8A038', spectre: '#705898', dragon: '#7038F8',
            tenebres: '#705848', acier: '#B8B8D0', fee: '#EE99AC',
          }[imgType] || '#444',
        }}
      >
        <button className="nav-btn left" onClick={prev}>❮</button>
        <button className="nav-btn right" onClick={next}>❯</button>

        <p className="prix">
          Prix : {prixFinal} €
          {promo && <span className="promo">-{promo}%</span>}
        </p>

        <button
          className="ajouter-panier"
          disabled={isInCart(currentPokemon.id)}
          onClick={() => handleAddToCart(currentPokemon)}
        >
          {isInCart(currentPokemon.id) ? "Déjà ajouté" : "Ajouter au panier"}
        </button>

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
          font-family: var(--font-vt), monospace;
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
